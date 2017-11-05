var mongoose = require('mongoose')

// MODELS
var Trait = require('../models/trait.model')

module.exports = {

  upvote: function(req, res) {
    console.log(req.params)
    var traitId = req.params.traitId

    Trait
      .findOneAndUpdate(traitId,
        {
          $inc: { upvoteScore: 1 }

        })
      .exec((err, updatedTrait) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log(updatedTrait)
          res.redirect('/games/' + req.params.gameId)
        }
    })
  },

  downvote: function(req, res) {
    console.log(req.params)
    var traitId = req.params.traitId

    Trait
      .findOneAndUpdate(traitId,
        {
          $inc: { downvoteScore: 1 }

        })
      .exec((err, updatedTrait) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log(updatedTrait)
          res.redirect('/games/' + req.params.gameId)
        }
    })
  }
}
