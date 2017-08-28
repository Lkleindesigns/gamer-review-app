require('./data/db.js')

const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      seedDB     = require('./seeds')

app.set('port', (process.env.PORT || 3000))

// Seed the database
seedDB()

app.set('view engine', "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
})
