var express = require('express')
var router  = express.Router()

// CONTROLLERS
var indexController = require('../controllers/users.controller.js')

router
  .route('/')
    .get()

router
  .route('/signup')
    .get()
    .post(indexController.createUser)

router
  .route('/login')
    .get()
    .post()

router
  .route('/logout')
    .get(authMiddleware.isLoggedIn, indexController.logoutUser)

module.exports = router
