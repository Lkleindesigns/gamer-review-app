var mongoose = require('mongoose')


var User = require('../models/user.model')

module.exports = {
  createUser: function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        console.log(err)
        return res.render('register')
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect('/games')
      })
    })
  }

  loginUser: function(req, res) {
    passport.authenticate('local',{
    successRedirect: '/games',
    failureRedirect: '/login'
    }),function(req,res){
    }
  }

  logoutUser: function(req, res) {
    req.logout()
    res.redirect('/games')
  }
}

// AUTH ROUTES
app.get('/register', (req, res) => {
  res.render('register')
})


// show login form
app.get('/login', (req, res) => {
  res.render('login')
})
// Handle login logic
app.post('/login')

//logout route
app.get('/logout', (req, res) => {

})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
