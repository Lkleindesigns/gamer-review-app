var express = require('express')
var router  = express.Router()

// CONTROLLERS
var reviewsController = require('../controllers/reviews.controller.js')

router
  .route('/')
    .get(usersController.userLogin)
    .post(authMiddleware.isLoggedIn, usersController.userLoginAuth)

module.exports = router

// OLD STYLE
app.get('/games/:id/reviews/new', (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    if (err) {
      console.log(err)
    } else {
      res.render('reviews/new', {game})
    }
  })
})

app.post('/games/:id/reviews', (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    if (err) {
      console.log(err)
    } else {
      Review.create(req.body.review, (err, review) => {
        if (err) {
          console.log(err)
        } else {
          game.reviews.push(review)
          game.save()
          res.redirect(`/games/${game._id}`)
        }
      })
    }
  })
})
