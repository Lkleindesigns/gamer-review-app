var mongoose = require('mongoose')

// MODELS
var Game = require('../models/game.model')

module.exports = {
  getAllGames: function(req, res) {
    Game.find({}, (err, allGames) => {
      if (err) {
        console.log(err)
      } else {
        res.render('games/index', {games: allGames, currentUser: req.user})
      }
    })
  },

  getById: function(req, res) {
    console.log(req.params.id)
    Game.findById(req.params.id).populate('reviews').exec(function(err, game) {
      if (err) {
        console.log(err)
      } else {
        res.render('games/show', {game})
      }
    })
  },

  addNewGame: function(req, res) {
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
  },

  updateById: function(req, res) {
    // TODo
  },

  deleteById: function(req, res) {
    // TODO
  },

  // Views
  renderNew: function(req, res) {
    res.render('games/new')
  }
}
