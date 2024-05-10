const {Router} = require('express');
const CartProductModel = require('../models/cart.model');

const CartProductRouter = Router()

CartProductRouter.get('/', async(req, res)=>{
    try {
        const products = await CartProductModel.find()
        //console.log(products);
        res.status(200).json(products)        
    } catch (error) {
        res.status(500).send({message:error})
    }

})

CartProductRouter.post('/addToCart', async(req, res)=>{
    const cartProducts = req.body;
   // console.log(cartProducts);
    try {
        const duplicateProd = await CartProductModel.findOne({_id:cartProducts._id})
      //  console.log(duplicateProd);
        
            if(duplicateProd === null){
                const products = await CartProductModel.create(cartProducts)
        //console.log(products);
        res.status(200).json({message: "Product added successfully"})
            }else{
                await CartProductModel.updateOne({_id:cartProducts._id}, { $inc: { count: 1 } });
        res.status(200).json({ message: 'Product count updated successfully' });
    }        
    } catch (error) {
        res.status(500).send({message:error})
    }

})

CartProductRouter.delete('/delete/:id', async(req, res)=>{
    const {id} = req.params;
    try {
    const resp = await CartProductModel.findOne({_id:id})
    //console.log(resp);
    if(resp !== null){
        if(resp.count <= 1){
            await CartProductModel.deleteOne({_id:id})
        return res.status(200).send({message:"Product removed successfully"})
        }
      //  console.log(resp);
        await CartProductModel.updateOne({_id:id}, { $inc: { count: -1 } });
        return res.status(200).send({message:"Product removed successfully"})   
    }else{
        return res.status(500).json({message: "Product not found"})
    }
    } catch (error) {
        return res.status(500).send("Error while removing the product",error)
    }
})

CartProductRouter.patch('/update/:id', async(req, res)=>{
    const {id} = req.params;
    try {
    const resp = await CartProductModel.findOne({_id:id})
    //console.log(resp);
    if(resp !== null){
        console.log(resp);
        await CartProductModel.updateOne({_id:id}, { $inc: { count: 1 } });
        return res.status(200).send({message:"Cart updated successfully"})   
    }else{
        return res.status(500).json({message: "Product not found"})
    }
    } catch (error) {
        return res.status(500).send("Error while updating the product",error)
    }
})

CartProductRouter.delete('/remove/:id', async(req, res)=>{
    const {id} = req.params;
    try {
    const resp = await CartProductModel.findOne({_id:id})
    //console.log(resp);
    if(resp !== null){
            await CartProductModel.deleteOne({_id:id})
        return res.status(200).send({message:"Product removed successfully"})
          
    }else{
        return res.status(500).json({message: "Product not found"})
    }
    } catch (error) {
        return res.status(500).send("Error while removing the product",error)
    }
})

CartProductRouter.delete('/clearCart', async(req, res)=>{
    try {
    await CartProductModel.deleteMany({})
    return res.status(200).send({message:"Product removed successfully"})

    } catch (error) {
        console.log("Error while clearing the cart: ",error);
        return res.status(500).json({error: "Internal server error"})
    }
})
module.exports = CartProductRouter;