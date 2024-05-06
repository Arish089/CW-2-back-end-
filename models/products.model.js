const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
image_url:{type: String, required: true},
name:{type: String, required: true},
desc:{type: String, required: true},
mrp:{type: Number, required: true},
off:{type: Number, required: true},
price:{type: Number, required: true},
review:{type: Number, required: true},
star:{type: Number, required: true}
},{versionKey: false})

const productModel = mongoose.model('Product', ProductSchema);

module.exports = productModel;