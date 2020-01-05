// Dependencies
// var restful = require('node-restful')
// var mongoose = restful.mongoose
var mongoose = require('mongoose')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')

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

merchantSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash == hash
}

merchantSchema.methods.generateJWT = function(){
    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime()/1000),
    }, "MY_SECRET")
}

mongoose.model('Merchant', merchantSchema)

// Return
// module.exports = restful.model('Merchant', merchantSchema)