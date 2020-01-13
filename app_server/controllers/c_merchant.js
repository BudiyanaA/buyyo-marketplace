// Index Router
var request = require('request')
var apiOptions = {
    server: "http://localhost:3000"
}

var _showError = function(req, res, status){
    var title, content
    if (status === 404){
        title = "404, page not found"
        content = "Oh dear. Looks like we can't find this page. Sorry."
    } else{
        title = status + ", something's gone wrong"
        content = "Something, somewhere, has gone just a little bit wrong."
    }
    res.status(status)
    res.render('v_merchant/error', {
        title: title,
        content: content
    })
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

var renderProductForm = function(req, res, merchDetail){
    res.render('v_merchant/product', {
        title: 'Add New Product ' + merchDetail.name,
        pageHeader: { title: 'Add Product ' + merchDetail.name},
        merchant: merchDetail
    })
}

var getMerchantInfo = function(req, res, callback){
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
            var data = body
            callback(req, res, data)
        }
    )
}

module.exports.merchantInfo = function(req, res){
    getMerchantInfo(req, res, function(req, res, responseData){
        renderDetailMerchant(req, res, responseData)
    })
}

module.exports.addProduct = function(req, res){
    getMerchantInfo(req, res, function(req, res, responseData){
        renderProductForm(req, res, responseData)
    })
}

module.exports.doAddProduct = function(req, res){
    var requestOptions, path, merchantId, postData
    merchantId = req.params.merchantId
    path = '/api/merchants/' + merchantId + '/products'
    postData = {
        name: req.body.name,
        price: parseInt(req.body.price),
        stock: parseInt(req.body.stock)
    }
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postData
    }
    request(
        requestOptions,
        function(err, response, body){
            if (response.statusCode === 201){
                res.redirect('/merchant/' + merchantId)
            } else{
                _showError(req, res, response.statusCode)
            }
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