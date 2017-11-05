var express = require('express')
var router  = express.Router({mergeParams: true})

// CONTROLLERS
var traitsController = require('../controllers/traits.controller')
// var authMiddleware  = require('../middleware/authMiddleware')

router
  .route('/:traitId/upvote')
    .get(traitsController.upvote)

router
  .route('/:traitId/downvote')
    .get(traitsController.downvote)

module.exports = router
