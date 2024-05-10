const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    order_id:{type:String, required:true},
    name:{type: String},
    amount: {type:Number, required:true},
    currency:{type:String, required:true},
    status:{type:String, default:'pending'},
    createdAt:{type:Date, default:Date.now()},
    razorpay_payment_id:{type: String, default: null},
    razorpay_order_id:{type: String, default: null},
    razorpay_signature:{type: String, default: null},
},{
    timestamps:true
})
const OrderModel = mongoose.model('order',OrderSchema)

module.exports = OrderModel;