var passport = require('passport')
var models  = require('../models')

// MODELS
var Trait       = models.Trait
var User        = models.User
var VoteKeeper  = models.VoteKeeper

var votingMiddleware = {
  checkForVoteEligibility: function(req, res, next) {
    var traitId = req.params.traitId
    var voteType = req.body.voteType

    if (req.isAuthenticated()) {
      User
        .findById(req.user._id)
        .then((foundUser) => {
          var votedOnTrait = userVotedOnTrait(foundUser.votedOnTraits, traitId)

          // Check if the User has even voted on the trait in question
          if (votedOnTrait != -1) {

            // User has the traitId in their votedOn list, now will check to see if it's the same vote type (up vs. down)
            if (voteType == votedOnTrait.voteType) {
              res.status(403).json({ error: 'Already voted.' })
            } else {

              // switch voteType and proceed proceed with voting
              for (var i = 0; i <  foundUser.votedOnTraits.length; i++) {
                if ( foundUser.votedOnTraits[i]._id == votedOnTrait._id) {
                  User.findById(foundUser._id, (err, user) => {
                    if (err) {
                      console.log(err)
                    } else {
                      user.votedOnTraits[i-1].voteType = 'down'
                      user.save((err, savedUser) => {
                        if (err) {
                          console.log(err)
                        } else {
                          console.log(savedUser)
                        }
                      })
                    }
                  })
                } else {
                  console.log('no go')
                }
              }
            }

          // User has never voted on this trait before, create new voteKeeper and add to Users list of voted on traits
          } else {

            // Method for creatings and adding voteKeeper objects to User, temporary until VoteKeeper controller is implemented.
            console.log(foundUser.votedOnTraits)
            foundUser.votedOnTraits.push({ trait: traitId, voteType: voteType })
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

function userVotedOnTrait(array, item) {
  for(var i = 0; i < array.length; i++) {
      if (array[i].trait == item) return array[i]
  }
  return -1
}