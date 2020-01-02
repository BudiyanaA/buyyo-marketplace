// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var merchantSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    name: String,
    category: String,
    desc: String,
    join: {
        type: Date,
        default: Date.now()
    }
})

//Return
module.exports = restful.model('Merchant', merchantSchema)