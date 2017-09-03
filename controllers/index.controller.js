var mongoose = require('mongoose')
var passport = require('passport')

var User = require('../models/user.model')

module.exports = {
  createUser: function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        console.log(err)
        return res.render('register')
      }
      loginUser()
    })
  },

  loginUser: passport.authenticate('local', {
    successRedirect: '/games',
    failureRedirect: '/login'
  }),

  logoutUser: function(req, res) {
    req.logout()
    res.redirect('/games')
  },
  // NOT SURE IF THIS IS RIGHT
  landing: function(req, res) {
    res.render('landing')
  },

  login: function(req, res) {
    res.render('login')
  },

  register: function(req, res) {
    res.render('register')
  }
}

// AUTH ROUTES
// app.get('/register', (req, res) => {
//   res.render('register')
// })


// // show login form
// app.get('/login', (req, res) => {
//   res.render('login')
// })
// // Handle login logic
// app.post('/login')

// //logout route
// app.get('/logout', (req, res) => {

// })
