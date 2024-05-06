const {Router} = require('express');
const AddressModel = require('../models/address.model');

const AddressRouter = Router()

AddressRouter.get('/', async(req, res)=>{
    try {
        const addresses = await AddressModel.find()
        console.log(addresses);
        res.status(200).json(addresses)        
    } catch (error) {
        res.status(500).send({message:error})
    }

})

AddressRouter.post('/addAddress', async(req, res)=>{
    const cartProducts = req.body;
    console.log(cartProducts);
    try {
        const duplicateProd = await AddressModel.findOne({_id:cartProducts._id})
        console.log(duplicateProd);
        
            if(duplicateProd === null){
                const products = await AddressModel.create(cartProducts)
        //console.log(products);
        res.status(200).json({message: "Product added successfully"})
            }else{
                await AddressModel.updateOne({_id:cartProducts._id}, { $inc: { count: 1 } });
        res.status(200).json({ message: 'Product count updated successfully' });
    }        
    } catch (error) {
        res.status(500).send({message:error})
    }

})

AddressRouter.patch('/update/:id', async(req, res)=>{
    const {id} = req.params;
    try {
    const resp = await AddressModel.findOne({_id:id})
    //console.log(resp);
    if(resp !== null){
        console.log(resp);
        await AddressModel.updateOne({_id:id}, { $inc: { count: 1 } });
        return res.status(200).send({message:"Cart updated successfully"})   
    }else{
        return res.status(500).json({message: "Product not found"})
    }
    } catch (error) {
        return res.status(500).send("Error while updating the product",error)
    }
})
AddressRouter.delete('/remove/:id', async(req, res)=>{
    const {id} = req.params;
    try {
    const resp = await AddressModel.findOne({_id:id})
    //console.log(resp);
    if(resp !== null){
            await AddressModel.deleteOne({_id:id})
        return res.status(200).send({message:"Product removed successfully"})
          
    }else{
        return res.status(500).json({message: "Product not found"})
    }
    } catch (error) {
        return res.status(500).send("Error while removing the product",error)
    }
})
module.exports = AddressRouter;