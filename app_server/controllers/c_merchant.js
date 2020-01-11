// Index Router
var request = require('request')
var apiOptions = {
    server: "http://localhost:3000"
}

var renderHomepage = function(req, res, responseBody){
    res.render('v_merchant/list', { 
        title: 'List Merchant',
        pageHeader: {
            title: 'List Merchant',
            strapline: 'List All of Merchants'
        },
        merchants: responseBody
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