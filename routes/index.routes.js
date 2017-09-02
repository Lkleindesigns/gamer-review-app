var express = require('express')
var router  = express.Router()

// CONTROLLERS
var indexController = require('../controllers/index.controller.js')
var authMiddleware  = require('../middleware/authMiddleware')

router
  .route('/')
    .get(indexController.landing)

router
  .route('/register')
    .get(indexController.register)
    .post(indexController.createUser)

router
  .route('/login')
    .get(indexController.login)
    .post(indexController.loginUser)

router
  .route('/logout')
    .get(authMiddleware.isLoggedIn, indexController.logoutUser)

module.exports = router
