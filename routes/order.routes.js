const {Router} = require('express');
const Razorpay = require('razorpay');
const OrderModel = require('../models/order.model');

const OrderRouter = Router();

const instance = new Razorpay({
    key_id: 'rzp_test_OLXHj88GqSNGal',
    key_secret: 'BDHNX9kawdGUuQGsUP6xpl2n'
});
OrderRouter.get('/',(req, res)=>{
    res.send("new order")
})

OrderRouter.post('/create/orderId', async(req, res)=>{
    console.log("create orderId request",req.body);
     try {
        const {amount} = req.body;
        var options = {
            amount: amount,
            currency: "INR",
            receipt: "rcp1"
        }

        const razorpayOrder = await razorpay.orders.create(options, (err, order)=>{
            console.log(order);
            res.send({orderId:order.id})
        })

        const newOrder = new OrderModel({
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        })

        await OrderModel.create(newOrder);

        res.send(razorpayOrder)
    } catch (error) {
        console.log("Error creating order",error);
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = OrderRouter;