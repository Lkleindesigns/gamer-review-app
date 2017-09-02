var passport = require('passport')

var authMiddleware = {
  isLoggedIn: function(req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }

    // console.log('Authorization check')
    res.redirect('/login')
    // console.log('Moo')
  }
}

module.exports = authMiddleware
