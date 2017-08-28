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

// OLD ROUTES \\
app.get('/', (req, res) => {
  res.render('landing')
})

//INDEX - Show all games
app.get('/games', (req, res) => {
  Game.find({}, (err, allGames) => {
    if (err) {
      console.log(err)
    } else {
      res.render('games/index', {games: allGames})
    }
  })
})

// CREATE - add new game to DB
app.post('/games', (req,res) => {
  var name = req.body.name
  var image = req.body.image
  var genre = req.body.genre
  var newGame = {name, image, genre}

  Game.create(newGame, (err, newlyCreated) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/games')
    }
  })
})

// NEW - show form to create new game
app.get('/games/new', (req, res) => {
  res.render('games/new')
})

//SHOW - shows more info about one game
app.get('/games/:id', (req, res) => {
  Game.findById(req.params.id).populate('reviews').exec(function(err, game) {
    if (err) {
      console.log(err)
    } else {
      res.render('games/show', {game})
    }
  })
})

// REVIEW Routes
app.get('/games/:id/reviews/new', (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    if (err) {
      console.log(err)
    } else {
      res.render('reviews/new', {game})
    }
  })
})

app.post('/games/:id/reviews', (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    if (err) {
      console.log(err)
    } else {
      Review.create(req.body.review, (err, review) => {
        if (err) {
          console.log(err)
        } else {
          game.reviews.push(review)
          game.save()
          res.redirect(`/games/${game._id}`)
        }
      })
    }
  })
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
})
