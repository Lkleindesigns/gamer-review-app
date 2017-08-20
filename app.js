const express = require('express')
const bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs")

var games = [
  {name: "Dota 2", image: "https://static-cdn.jtvnw.net/ttv-boxart/Dota%202-272x380.jpg"},
  {name: "Pokemon Sun Moon", image: "https://static-cdn.jtvnw.net/ttv-boxart/Pok%C3%A9mon%20Sun/Moon-272x380.jpg"},
  {name: "Counter-Strike: Global Offensive", image: "https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-272x380.jpg"}
]

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/games', (req, res) => {
  res.render('games', {games})
})

app.post('/games', (req,res) => {
  var name = req.body.name
  var image = req.body.image
  var newGame = {name, image}
  games.push(newGame)
  res.redirect('/games')
})

app.get('/games/new', (req, res) => {
  res.render('new')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
