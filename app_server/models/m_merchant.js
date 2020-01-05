var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: Number
})

var merchantSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: [String],
    desc: String,
    join: {
        type: Date,
        default: Date.now()
    },
    products: [productSchema],
    hash: String,
    salt: String
})

mongoose.model('Merchant', merchantSchema)