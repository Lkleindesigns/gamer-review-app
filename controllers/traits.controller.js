var mongoose = require('mongoose')
var models  = require('../models')

// MODELS
var Trait = models.Trait
var Game = models.Game

module.exports = {

  allTraitsForGame: function(req, res) {
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
      .then((game) => {
        allTraits = {}
        game.genres.forEach((genre) => {
          allTraits[genre.name] = genre.traits
        })
        res.json(allTraits)
      })
      .catch((err) => {
        res.send(err)
      })
  },

  upvote: function(req, res) {
    console.log(req.params)

    var traitId = req.params.traitId

    Trait
      .findOneAndUpdate(traitId, { $inc: { upvoteScore: 1 } }, {new: true})
      .then((trait) => {
        res.json(trait)
      })
      .catch((err) => {
        res.send(err)
      })
  },

  downvote: function(req, res) {
    console.log(req.params)

    var traitId = req.params.traitId

    Trait
      .findOneAndUpdate(traitId, { $inc: { downvoteScore: 1 } }, {new: true})
      .then((trait) => {
        res.json(trait)
      })
      .catch((err) => {
        res.send(err)
      })
  }
}
