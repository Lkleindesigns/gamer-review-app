var passport = require('passport')

var authMiddleware = {
  isLoggedIn: function(req, res, next) {
    if(req.isAuthenticated()) {
    return next()
  }
    console.log('Authorization check')
    res.redirect('/login')
  }
}

module.exports = authMiddleware
