const express    = require('express'),
      mongoose   = require('mongoose')
      bodyParser = require('body-parser')

var app = express()
mongoose.connect('mongodb://localhost/gamer-reviews', {useMongoClient: true,});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs")

//SCHEMA SETUP
var gameSchema = new mongoose.Schema({
  name: String,
  image: String,
  genre: String,
})

var Game = mongoose.model("Game", gameSchema)

var games = [
  {name: "Dota 2", image: "https://static-cdn.jtvnw.net/ttv-boxart/Dota%202-272x380.jpg"},
  {name: "Pokemon Sun Moon", image: "https://static-cdn.jtvnw.net/ttv-boxart/Pok%C3%A9mon%20Sun/Moon-272x380.jpg"},
  {name: "Counter-Strike: Global Offensive", image: "https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-272x380.jpg"}
]

app.get('/', (req, res) => {
  res.render('landing')
})

//INDEX - Show all games
app.get('/games', (req, res) => {
  Game.find({}, (err, allGames) => {
    if (err) {
      console.log(err)
    } else {
      res.render('index', {games: allGames})
    }
  })
})

// CREATE - add new game to DB
app.post('/games', (req,res) => {
  var name = req.body.name
  var image = req.body.image
  var genre = req.body.genre
  var newGame = {name, image, genre}
  // Create a new game and save to DB

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
  res.render('new')
})

//SHOW - shows more info about one game
app.get('/games/:id', (req, res) => {
  //find the game with the provided ID
  Game.findById(req.params.id, (err, foundGame) => {
    if (err) {
      console.log(err)
    } else {
      res.render("show", {game: foundGame})
    }
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
