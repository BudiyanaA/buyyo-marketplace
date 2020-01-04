//Dependencies
var db = require('./config/db')
var express = require('express')
var bodyParser = require('body-parser')

//add
var passport = require('passport')
require('./models/merchant')
require('./models/customer')
require('./models/admin')
require('./config/passport')

// Initialitation  body-parser
var app = express()

const path = require('path')
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//add
app.use(passport.initialize())
app.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401)
        res.json({ "message" : err.name + " : " + err.message })
    }
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.use('/api', require('./routes/api'))

app.use('/login', function(req, res){
    res.render('signin')
})
var authentication = require('./controllers/authentication')
app.post('/login', authentication.login)

//Running server
const port = 3000
app.listen(port)
console.log(`Listening on port ${port}...`)