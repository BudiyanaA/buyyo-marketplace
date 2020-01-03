// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var recordSchema = new mongoose.Schema({
    time: {
        type: Date,
        default: Date.now()
    },
    merchant: String,
    customer: String,
    product: String,
    total: Number,
    price: Number
})

//Return
module.exports = restful.model('Record', recordSchema)