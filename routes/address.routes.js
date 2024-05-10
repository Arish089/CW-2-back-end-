const {Router} = require('express');
const AddressModel = require('../models/address.model');


const AddressRouter = Router();

AddressRouter.get('/',async (req, res)=>{
    try {
       const newAddress= await AddressModel.find()
        res.status(200).send(newAddress)
    } catch (error) {
        console.log(error);
    }
})

module.exports = AddressRouter;