// Dependencies
var express = require('express')
var router = express.Router()
var ctrlCustomer = require('../controllers/c_customer')

/* GET home page. */
router.get('/',ctrlCustomer.index)
router.get('/signin',ctrlCustomer.signin)
router.get('/signin_process', ctrlCustomer.signin_process)
router.get('/register', ctrlCustomer.register)
router.get('/register_process', ctrlCustomer.register_process)

module.exports = router