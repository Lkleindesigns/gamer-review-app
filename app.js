const express    = require('express'),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser'),
      Review     = require('./models/review'),
      seedDB     = require('./seeds')
      Game       = require('./models/game')

var app = express()
mongoose.connect('mongodb://localhost/gamer-reviews', {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs")
app.use(express.static(__dirname + "/public"))
seedDB()


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

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
