// Dependencies
var express = require('express')
var router = express.Router()

// Models
var Product = require('../models/product')
var Merchant = require('../models/merchant')
var Record = require('../models/record')

//add
var jwt = require('express-jwt')
var ctrlProfile = require('../controllers/profile')
var auth = jwt({
    secret: 'SECHASIA',
    userProperty: 'payload'
})

router.get('/profile', auth, ctrlProfile.profileRead)

// Routes
Product.methods(['get', 'put', 'post', 'delete'])
Product.register(router, '/products')

Merchant.methods(['get', 'put', 'post', 'delete'])
Merchant.register(router, '/merchant')

Record.methods(['get', 'put', 'post', 'delete'])
Record.register(router, '/record')

// Return
module.exports = router


//https://www.sitepoint.com/user-authentication-mean-stack/