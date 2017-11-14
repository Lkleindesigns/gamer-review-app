var mongoose = require('mongoose')
var models  = require('../models')

// MODELS
var Game = models.Game

module.exports = {
  test: function(req, res) {
    console.log(req.params.gameId)
    res.send('test')
  },

  getAllGames: function(req, res) {
    Game.find()
      .then((allGames) => {
        res.render('games/index', { games: allGames, currentUser: req.user })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getById: function(req, res) {
    var gameId = req.params.gameId

    Game
      .findById(gameId)
      .populate({
        path: 'genres',
        model: 'Genre',
        populate: {
          path: 'traits',
          model: 'Trait'
        }
      })
      .exec((err, game) => {
        if (err) {
          console.log(err)
        } else {
          res.render('games/show', { game })
        }
      })
  },

  addNewGame: function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var genre = req.body.genre
    var newGame = { name, image, genre }

    Game.create(newGame, (err, newlyCreated) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/games')
      }
    })
  },

  updateById: function(req, res) {
    // TODO
  },

  deleteById: function(req, res) {
    // TODO
  },

  // Views
  renderNew: function(req, res) {
    res.render('games/new')
  }
}
