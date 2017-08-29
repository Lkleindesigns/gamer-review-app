var authMiddleware = {
  isLoggedIn: function(req, res, next) {
  //   if(req.isAuthenticated()) {
  //   return next()
  // }
    console.log('Authorization check')
    return next()
  }
}

module.exports = authMiddleware
