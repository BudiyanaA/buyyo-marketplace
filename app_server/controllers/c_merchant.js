// Index Router

var request = require('request')
var apiOptions = {
    server: "http://localhost:3000"
}
var requestOptions = {
    url: "http://localhost:3000/api/merchants",
    method: "GET",
    json: {},
    qs: {
        offset : 20
    }
}
request(requestOptions, function(err, response, body){
    if (err){
        console.log(err)
    } else if(response.statusCode === 200){
        console.log(body)
    }
    else{
        console.log(response.statusCode)
    }
})

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