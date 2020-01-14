var express = require('express')
var router = express.Router()
var ctrlMerchant = require('../controllers/c_merchant')
var ctrlProduct = require('../controllers/c_product')

var ctrlAuth = require('../controllers/merch_auth')
var ctrlProfile = require('../controllers/merch_profile')
var jwt = require('express-jwt')
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
})

// CRUD merchants
router.get('/merchants', ctrlMerchant.merchantList)
router.post('/merchants', ctrlMerchant.merchantCreate)
router.get('/merchants/:merchantId', ctrlMerchant.merchantReadOne)
router.put('/merchants/:merchantId', ctrlMerchant.merchantUpdateOne)
router.delete('/merchants/:merchantId', ctrlMerchant.merchantDeleteOne)

// CRUD products
router.post('/merchants/:merchantId/products', ctrlProduct.productCreate)
router.get('/merchants/:merchantId/products/:productId', ctrlProduct.productReadOne)
router.put('/merchants/:merchantId/products/:productId', ctrlProduct.productUpdateOne)
router.delete('/merchants/:merchantId/products/:productId', ctrlProduct.productDeleteOne)

// AUTH
router.post('/merchants/register', ctrlAuth.register)
router.post('/merchants/login', ctrlAuth.login)
router.get('/merchants/profile/:merchantId', auth, ctrlProfile.profileRead)

module.exports = router