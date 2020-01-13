var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

var ctrlMerchant = require('../controllers/c_merchant')

/* GET home page. */
router.get('/', ctrlMain.index);

/* MERCHANTS */
router.get('/merchant', ctrlMerchant.homelist)
router.get('/merchant/:merchantId', ctrlMerchant.merchantInfo)
router.get('/merchant/:merchantId/product/new', ctrlMerchant.addProduct)
router.post('/merchant/:merchantId/product/new', ctrlMerchant.doAddProduct)

module.exports = router;
