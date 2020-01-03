// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var productSchema = new mongoose.Schema({
    name: String,
    vendor: String,
    stock: Number,
    price: Number
})

//Return
module.exports = restful.model('Products', productSchema)