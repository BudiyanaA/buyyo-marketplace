// Dependencies
var mongoose = require('mongoose')

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

mongoose.model('Customer', customerSchema)