var passport = require('passport')
var models  = require('../models')

// MODELS
var Trait = models.Trait
var User  = models.User

var votingMiddleware = {
  checkForVoteEligibility: function(req, res, next) {
    var traitId = req.params.traitId

    if (req.isAuthenticated()) {
      User
        .findById(req.user._id)
        .then((foundUser) => {
          if (foundUser.votedOnTraits.indexOf(traitId) > -1) {
            res.status(403).json({ error: 'Already voted.' })
          } else {
            foundUser.votedOnTraits.push(traitId)
            foundUser.save()
            return next()
          }
        })
        .catch((err) => {
          console.log('No found user.')
          console.log(err)
        })
    } else {
      console.log('Must be logged in to vote')
      res.status(403).json({ error: 'Must be logged in to vote.' })
    }
  }
}

module.exports = votingMiddleware
