const mongoose = require('mongoose')

const CartProductSchema = new mongoose.Schema({
image_url:{type: String, required: true},
name:{type: String, required: true},
desc:{type: String, required: true},
mrp:{type: Number, required: true},
off:{type: Number, required: true},
price:{type: Number, required: true},
review:{type: Number, required: true},
star:{type: Number, required: true},
count:{type: Number, required: true, default:1}
}, {versionKey: false})

const CartProductModel = mongoose.model('cart', CartProductSchema);

module.exports = CartProductModel;