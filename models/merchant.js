// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose
var crypto = require('crypto')

// Schema
var merchantSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
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

// Method
merchantSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

// Return
module.exports = restful.model('Merchant', merchantSchema)