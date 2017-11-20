var express = require('express')
var router  = express.Router({mergeParams: true})

// CONTROLLERS
var traitsController = require('../controllers/traits.controller')
// var authMiddleware  = require('../middleware/authMiddleware')

router
  .route('/:gameId')
    .get(traitsController.allTraitsForGame)

router
  .route('/:traitId/byId')
    .get(traitsController.getById)

router
  .route('/:traitId/upvote')
    .put(traitsController.upvote)

module.exports = router
