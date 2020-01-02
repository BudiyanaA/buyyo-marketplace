// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

//Schema
var adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String
})

//Return

module.exports = restful.model('Admin', adminSchema)