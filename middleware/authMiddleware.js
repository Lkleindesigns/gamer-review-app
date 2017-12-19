var passport = require('passport')

var authMiddleware = {
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('danger', 'Must be logged in.')
    res.redirect('back')
  }
}

module.exports = authMiddleware
