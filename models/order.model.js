const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId:{type:String, required:true},
    amount: {type:Number, required:true},
    currency:{type:String, required:true},
    status:{type:String, default:'pending'},
    createdAt:{type:Date, default:Date.now()}
})
const OrderModel = mongoose.model('order',OrderSchema)

module.exports = OrderModel;