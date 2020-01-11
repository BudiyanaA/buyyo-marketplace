var express = require('express')
var router = express.Router()
var ctrlMerchant = require('../controllers/c_merchant')
var ctrlProduct = require('../controllers/c_product')

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

router.post('/merchants/login/', ctrlMerchant.merchantLogin)

module.exports = router