var express = require('express')
var router  = express.Router({mergeParams: true})

// CONTROLLERS
var gamesController = require('../controllers/games.controller')
var authMiddleware  = require('../middleware/authMiddleware')

router
  .route('/')
    .get(gamesController.getAllGames)
    .post(authMiddleware.isLoggedIn, gamesController.addNewGame)

router
  .route('/new')
    .get(authMiddleware.isLoggedIn, gamesController.renderNew)

router
  .route('/:gameId')
    .get(gamesController.getById)
    .put(gamesController.updateById)
    .delete(gamesController.deleteById)

router
  .route('/:gameId/test')
    .get(gamesController.test)

module.exports = router
