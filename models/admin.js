// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

//Schema
var adminSchema = new mongoose.Schema({
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
    hash: String,
    salt: String
})

//Return

module.exports = restful.model('Admin', adminSchema)