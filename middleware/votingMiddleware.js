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
                if (foundUser.votedOnTraits[i]._id == votedOnTrait._id) {

                  /*
                    Maybe try this whole thing the other way around:
                    Find the trait first, based off of the votedOntrait.Id
                    then open up the user and end with changing the vote type
                  */

                  // Possible move this endpoint to it's own route
                  User.findById(foundUser._id, (err, user) => {
                    if (err) {
                      console.log(err)
                    } else {
                      if (user.votedOnTraits[i-1].voteType == 'up') {
                        user.votedOnTraits[i-1].voteType = 'down'

                        // Take away the vote from Upvote
                        Trait
                        .findOneAndUpdate({_id: user.votedOnTraits[i-1].trait}, {
                          $inc: { upvoteScore: -1 },
                          $inc: { downvoteScore: 1 }
                        }, {new: true}, (err, updatedTrait) => {
                          if (err) {
                            console.log(err)
                          } else {
                            updatedTrait.save()
                            user.save()
                          }
                        })
                      } else if (user.votedOnTraits[i-1].voteType == 'down') {
                        user.votedOnTraits[i-1].voteType = 'up'
                        // Take away the vote from Downvote
                        Trait
                        .findOneAndUpdate({_id: user.votedOnTraits[i-1].trait}, {
                          $inc: { downvoteScore: -1 },
                          $inc: { upvoteScore: 1 }
                        }, {new: true}, (err, updatedTrait) => {
                          if (err) {
                            console.log(err)
                          } else {
                            updatedTrait.save()
                            user.save()
                          }
                        })
                      }
                    }
                  })
                  .then((user) => {
                    console.log('Ayo, show ya de wey')
                    console.log(user.votedOnTraits[i-1].trait)
                    Trait.findById(user.votedOnTraits[i-1].trait)
                      .then((trait) => {
                        res.json(trait)
                      })
                  })
                  .catch((err) => {
                    console.log(err)
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