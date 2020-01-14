var passport = require('passport')
var mongoose = require('mongoose')
var Merchant = mongoose.model('Merchant')

module.exports.register = function(req, res){
    var merchant = new Merchant()

    merchant.username = req.body.username
    merchant.name = req.body.name
    merchant.category = req.body.category.split(",")
    merchant.desc = req.body.desc

    merchant.setPassword(req.body.password)

    merchant.save(function(err){
        var token
        token = merchant.generateJWT()
        res.status(200)
        res.json({
            "token" : token
        })
    })
}

module.exports.login = function(req, res, next){
    passport.authenticate('local', function(err, merchant, info){

        var token

        if(err){
            res.status(404).json(err)
            return
        }

        if(merchant){
            token = merchant.generateJWT()
            res.status(200)
            res.json({
                "token" : token
            })
        } else{
            res.status(401).json(info)
        }
    })(req, res, next)
}