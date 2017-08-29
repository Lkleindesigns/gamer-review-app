require('./data/db.js')

const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      seedDB     = require('./data/seeds'),
      passport   = require('passport'),
      LocalStrategy = require('passport-local'),
      User       = require('./models/user.model')

var game_routes   = require('./routes/games.routes'),
    review_routes = require('./routes/reviews.routes'),
    index_routes    = require('./routes/index.routes')

app.set('port', (process.env.PORT || 3000))

// Seed the database
seedDB()

app.set('view engine', "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

// PASSPORT CONGIFURATION
app.use(require('express-session')({
  secret: 'abc123',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// PASSPORT CONFIGURATION

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.use('/', index_routes)
app.use('/games/:id/reviews', review_routes)
app.use('/games', game_routes)

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
})


module.exports = {app}
