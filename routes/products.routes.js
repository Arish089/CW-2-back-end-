const {Router} = require('express');
const productModel = require('../models/products.model');

const productRouter = Router()

productRouter.get('/', async(req, res)=>{
    const {page} = req.query ;
    try {
        const products = await productModel.find().skip((page-1)*10).limit(10)
        const totalProducts = await productModel.countDocuments()
        //console.log(products);
        res.status(200).send({
            products:products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts/10),
            totalProducts: products.length
        })        
    } catch (error) {
        res.status(500).send({message:error})
    }

})

productRouter.get('/search', async(req, res)=>{
    //console.log(req.query);
    const {searchProd} = req.query
    try {
        const products = await productModel.find({ name: { $regex: new RegExp(searchProd, 'i') } })
        //console.log(products);
        res.status(200).json(products)        
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