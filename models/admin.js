// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose
var crypto = require('crypto')
var jwt = require('jsonwebtoken')

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


//Metohd
adminSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

adminSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash == hash
}

adminSchema.methods.generateJWT = function(){
    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime()/1000),
    }, "RAHACRET")   
}
mongoose.model('Admin', adminSchema)

//Return
module.exports = restful.model('Admin', adminSchema)