var express = require('express')
var router  = express.Router()

// CONTROLLERS
var indexController = require('../controllers/index.controller.js')
var authMiddleware  = require('../middleware/authMiddleware')

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
