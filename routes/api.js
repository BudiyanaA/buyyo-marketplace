// Dependencies
var express = require('express')
var router = express.Router()

// Models
var User = require('../models/user')
var Product = require('../models/product')
var Merchant = require('../models/merchant')

// Routes
Product.methods(['get', 'put', 'post', 'delete'])
Product.register(router, '/products')

User.methods(['get', 'put', 'post', 'delete'])
User.register(router, '/user')

Merchant.methods(['get', 'put', 'post', 'delete'])
Merchant.register(router, '/merchant')

// Return
module.exports = router


//https://www.sitepoint.com/user-authentication-mean-stack/