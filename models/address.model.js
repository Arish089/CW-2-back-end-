const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
name:{type: String},
building:{type: String, required: true},
pincode:{type: String, required: true},
city:{type: String, required: true},
state:{type: String, required: true},
mobile:{type: String, required: true},
address_place:{type: String, required: true}
},{versionKey: false})

const AddressModel = mongoose.model('address', AddressSchema);

module.exports = AddressModel;