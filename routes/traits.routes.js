var express = require('express')
var router  = express.Router({mergeParams: true})

// CONTROLLERS
var traitsController  = require('../controllers/traits.controller')
var authMiddleware    = require('../middleware/authMiddleware')
var votingMiddleware  = require('../middleware/votingMiddleware')

router
  .route('/:traitId')
    .get(traitsController.getById)

router
  .route('/:gameId/all')
    .get(traitsController.allTraitsForGame)

router
  .route('/:traitId/upvote')
    .put(votingMiddleware.checkForVoteEligibility, traitsController.upvote)

router
  .route('/:traitId/downvote')
    .put(votingMiddleware.checkForVoteEligibility, traitsController.downvote)

module.exports = router
