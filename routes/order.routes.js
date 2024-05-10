const {Router} = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto')
const OrderModel = require('../models/order.model');
require('dotenv').config()

const OrderRouter = Router();

const instance = new Razorpay({
    key_id: 'rzp_test_OLXHj88GqSNGal',
    key_secret: process.env.secret
});
OrderRouter.get('/',(req, res)=>{
    res.send("new order")
})

OrderRouter.post('/create-order', async(req, res)=>{
   // console.log("create orderId request",req.body);
     try {
        const {amount,name} = req.body;
        var options = {
            amount: amount,
            currency: "INR",
            receipt: "rcp1"
        }

        const order = await instance.orders.create({
            amount: amount,
            currency: "INR",
            receipt: "rcp1"})

        await OrderModel.create({
           order_id: order.id,
           name: name,
           currency: "INR",
           amount:amount
        })

        //console.log({order});
        res.send({order})

        
    } catch (error) {
        console.log("Error creating order",error);
        res.status(500).json({error: 'Internal server error'})
    }
})

OrderRouter.post('/payment-verification', async(req, res)=>{
    //console.log(req.body);
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
    const body_data = `${razorpay_order_id}|${razorpay_payment_id}`;
    
    const expect = crypto.createHmac('sha256',process.env.secret).update(body_data).digest('hex')
    const isValid = expect === razorpay_signature

    if(isValid){
        try {
            await OrderModel.findOneAndUpdate({order_id: razorpay_order_id},{
                $set:{
                    razorpay_order_id: razorpay_order_id, razorpay_payment_id: razorpay_payment_id, razorpay_signature: razorpay_signature
                }
            })
            res.redirect(`https://main--tata-1mgs.netlify.app//success?payment_id=${razorpay_payment_id}`)
            return
        } catch (error) {
            console.log(error);
            res.json({error:error.msg})
        }
    }else{
        res.redirect('https://main--tata-1mgs.netlify.app//failed')
        return
    }
})

module.exports = OrderRouter;