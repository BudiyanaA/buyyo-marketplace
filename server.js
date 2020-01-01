//Dependencies
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

//MongoDB connection
mongoose.connect('mongodb://localhost/db_buyyo')

//Initialitation express
var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Routes
app.use('/api', require('./routes/api'))

//Running server
const port = 3000
app.listen(port)
console.log(`Listening on port ${port}...`)