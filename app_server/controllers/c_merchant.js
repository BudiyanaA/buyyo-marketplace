/* GET home page. */
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