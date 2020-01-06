var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var Merchant = mongoose.model('Merchant')

passport.use(new LocalStrategy({
    usernameField: 'username'
    },
function(username, password, done){
    Merchant.findOne({ username: username }, function (err, merchant){
        if(err) { return done(err) }

        if(!merchant){
            return done(null, false, {
                message: 'Merchant not found'
            })
        }

        if(!merchant.validPassword(password)){
            return done(null, false, {
                message: 'Password is wrong'
            })
        }

        return done(null, merchant)
    })
}))