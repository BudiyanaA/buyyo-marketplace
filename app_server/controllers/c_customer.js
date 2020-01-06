/* GET home page. */
module.exports.index = function(req,res){
    res.render('v_customer/index',{ title : 'Customer' })
}

module.exports.signin = function(req,res){
    res.render('v_customer/signin',{ title: 'Sign in'})
}

module.exports.signin_process = function(req,res){
    res.render('v_customer/profile',{
        title : 'Sign in',
        data: {
            username: '*usernameplaceholder'
        }
    })
}

module.exports.register = function(req,res){
    res.render('v_customer/register', { title : 'register'})
}

module.exports.register_process = function(req,res){
    res.render('v_customer/index',{
        title : 'Customer'
    })
}

