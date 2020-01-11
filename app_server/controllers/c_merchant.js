// Index Router
var request = require('request')
var apiOptions = {
    server: "http://localhost:3000"
}

var renderHomepage = function(req, res, responseBody){
    var message
    if(!(responseBody instanceof Array)){
        message = "API lookup error"
        responseBody = []
    } else{
        if (!responseBody.length){
            message = "No Merchants found"
        }
    }
    res.render('v_merchant/list', { 
        title: 'List Merchant',
        pageHeader: {
            title: 'List Merchant',
            strapline: 'List All of Merchants'
        },
        merchants: responseBody,
        message: message
    })
}

module.exports.homelist = function(req, res){
    var requestOptions, path
    path = '/api/merchants'
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs: {
            offset: 20
        }
    }
    request(
        requestOptions,
        function(err, response, body){
            renderHomepage(req, res, body)
        }
    )
}

var renderDetailMerchant = function(req, res, merchDetail){
    res.render('v_merchant/detail', {
        title: merchDetail.name,
        pageHeader: {
            title: merchDetail.name
        },
        merchant: merchDetail
    })
}

module.exports.merchantInfo = function(req, res){
    var requestOptions, path
    path = '/api/merchants/' + req.params.merchantId
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    }
    request(
        requestOptions,
        function(err, response, body){
            renderDetailMerchant(req, res, body)
        }
    )
}


/* GET home page. */
// Merchant Router
module.exports.index = function(req, res){
    res.render('v_merchant/index', { title: 'Merchant' })
}

module.exports.signin = function(req, res){
    res.render('v_merchant/signin', { title: 'Sign in' })
}

module.exports.signin_process = function(req, res){
    res.render('v_merchant/profile', { 
        title: 'Sign in', 
        data: {
            username: 'Admin'
        }
    })
}