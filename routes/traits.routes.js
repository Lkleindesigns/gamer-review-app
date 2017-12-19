var express = require('express')
var router  = express.Router({mergeParams: true})

// CONTROLLERS
var traitsController = require('../controllers/traits.controller')
var authMiddleware  = require('../middleware/authMiddleware')

router
  .route('/:traitId')
    .get(traitsController.getById)

router
  .route('/:gameId/all')
    .get(traitsController.allTraitsForGame)

router
  .route('/:traitId/upvote')
    .put(authMiddleware.isLoggedIn, traitsController.upvote)

router
  .route('/:traitId/downvote')
    .put(authMiddleware.isLoggedIn, traitsController.downvote)

module.exports = router
