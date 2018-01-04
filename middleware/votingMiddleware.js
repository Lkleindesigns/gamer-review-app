var passport = require('passport')
var models  = require('../models')

// MODELS
var Trait = models.Trait
var User  = models.User

var votingMiddleware = {
  checkForVoteEligibility: function(req, res, next) {
    if (req.isAuthenticated()) {
      var traitId = req.params.traitId

      User.findById(req.user._id)
      .exec()
      .then((foundUser) => {
        if (foundUser.votedOnTraits.indexOf(traitId) > -1) {
          req.flash('danger', 'Already voted.')
          res.redirect('back')
        } else {
          // foundUser.votedOnTraits.push(traitId)
          // foundUser.save()
          // console.log(foundUser)
          console.log('moving on...')
          return next()
        }
      })
    } else {
      req.flash('danger', 'Must be logged in.')
      res.redirect('back')
    }
  }
}

module.exports = votingMiddleware
