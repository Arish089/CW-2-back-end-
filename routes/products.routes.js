const {Router} = require('express');
const productModel = require('../models/products.model');

const productRouter = Router()

productRouter.get('/', async(req, res)=>{
    try {
        const products = await productModel.find()
        //console.log(products);
        res.status(200).send(products)        
    } catch (error) {
        res.status(500).send({message:error})
    }

})
productRouter.get('/:id', async(req, res)=>{
    const {id} = req.params
    try {
        const products = await productModel.findById({_id:id})
        //console.log(products);
        res.status(200).json(products)        
    } catch (error) {
        res.status(500).send({message:error})
    }

})

module.exports = productRouter;