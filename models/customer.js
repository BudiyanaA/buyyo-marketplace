// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var customerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
})

//Return
module.exports = restful.model('Customer', customerSchema)