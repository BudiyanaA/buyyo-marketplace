// Dependencies
var express = require('express')
var router = express.Router()

// Models
var Product = require('../models/product')
var Merchant = require('../models/merchant')
var Record = require('../models/record')
var Admin = require('../models/admin')
var Customer = require('../models/customer')

// Routes
Product.methods(['get', 'put', 'post', 'delete'])
Product.register(router, '/products')

Merchant.methods(['get', 'put', 'post', 'delete'])
Merchant.register(router, '/merchant')

Record.methods(['get', 'put', 'post', 'delete'])
Record.register(router, '/record')

Admin.methods(['get', 'put', 'post', 'delete'])
Admin.register(router,'/admin')

Customer.methods(['get', 'put', 'post', 'delete'])
Customer.register(router,'/customer')

// Return
module.exports = router


//https://www.sitepoint.com/user-authentication-mean-stack/