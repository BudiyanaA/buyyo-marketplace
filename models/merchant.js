// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var merchantSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: String,
    category: String,
    desc: String,
    join: {
        type: Date,
        default: Date.now()
    },
    hash: String,
    salt: String
})

//Return
module.exports = restful.model('Merchant', merchantSchema)