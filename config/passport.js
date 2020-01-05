var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var Merchant = mongoose.model('Merchant')

var Customer = mongoose.model('Customer')
var Admin = mongoose.model('Admin')

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

    Customer.findOne({username: username}, function(err, customer){
        if(err){ return done(err)}

        if(!customer){
            return done(null,false,{
                message: 'Customer not found'
            })
        }

        if(!customer.validPassword(password)){
            return done(null,false, {
                message: 'Password is wrong'
            })
        }

        return done(null, customer)
    })

    Admin.findOne({username: username}, function(err, admin){
        if(err){return done(err)}

        if(!admin){
            return done(null,false,{
                message: 'Admin not found'
            })
        }

        if(!admin.validPassword(password)){
            return done(null,false, {
                message: 'Password is wrong'
            })
        }
    })
}))