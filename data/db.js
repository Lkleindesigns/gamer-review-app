const mongoose = require('mongoose')

var dbUrl = 'mongodb://localhost/gamer-reviews'
var dbUrlTest = 'mongodb://localhost/gamer-reviews-test'
var env = process.env.NODE_ENV || 'development'

console.log('************ENV', env)

if(env === 'development') {
process.env.MONGODB_URI = dbUrl
} else if(env === 'test') {
process.env.MONGODB_URI = dbUrlTest
}

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})

mongoose.connection.on('connected', function() {
  console.log('Connected to database:', process.env.MONGODB_URI)
})

mongoose.connection.on('disconnected', function() {
  console.log('Disconnected from database:', process.env.MONGODB_URI)
})

mongoose.connection.on('error', function(error) {
  console.log('Mongoose connection error: ' + error)
})

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnection via app termination: (SIGINT)')
    process.exit(0)
  })
})

process.on('SIGTERM', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnection via app termination: (SIGTERM)')
    process.exit(0)
  })
})

// MODELS AND SCHEMAS
require('../models/game.model')
require('../models/review.model')
require('../models/user.model')
