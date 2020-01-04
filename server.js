//Dependencies
var db = require('./config/db')
var express = require('express')
var bodyParser = require('body-parser')

//add
var passport = require('passport')
require('./models/merchant')
require('./config/passport')

// Initialitation  body-parser
var app = express()

//add
app.use(passport.initialize())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.use('/api', require('./routes/api'))

//Running server
const port = 3000
app.listen(port)
console.log(`Listening on port ${port}...`)