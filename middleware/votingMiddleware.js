var passport = require('passport')

// MODELS
var Trait = models.Trait
var User  = models.User

var votingMiddleware = {
  alreadyVoted: function(req, res, next) {
    var traitId = req.params.traitId

    User.findById(userId)
    .exec()
    .then((data) => {
      data.find( { votedOnTraits: { $in: traitId } } )
    })

    if (true) {
      req.flash('danger', 'Already voted.')
    } else {

    }
  }
}

module.exports = votingMiddleware
