var db = require('./data/db.js')
var models  = require('./models')

const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      seedDB        = require('./data/seeds'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      User          = models.User

app.set('port', (process.env.PORT || 3000))

// Seed the database
seedDB()

app.set('view engine', "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(__dirname + '/public'))

// ----- PASSPORT CONGIFURATION ----- //
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

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

// ----- ROUTES ----- //
var gameRoutes   = require('./routes/games.routes')
var traitRoutes  = require('./routes/traits.routes')
var indexRoutes  = require('./routes/index.routes')

app.use('/', indexRoutes)
app.use('/games', gameRoutes)
app.use('/api/traits', traitRoutes)

// ----- LISTEN ----- //
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
})

module.exports = {app}
