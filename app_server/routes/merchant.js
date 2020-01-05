var express = require('express')
var router = express.Router()
var ctrlMerchant = require('../controllers/c_merchant')

/* GET home page. */
router.get('/', ctrlMerchant.index)
router.get('/signin', ctrlMerchant.signin)
router.get('/signin_process', ctrlMerchant.signin_process)

module.exports = router
