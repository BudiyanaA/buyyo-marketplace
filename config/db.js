//Dependencies
var mongoose = require('mongoose')

// Initialize
var host = 'localhost'
var db = 'db_buyyo'

// MongoDB connection
mongoose.connect(`mongodb://${host}/${db}`)