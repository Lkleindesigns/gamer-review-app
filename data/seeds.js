const mongoose = require('mongoose'),
      Review   = require('./../models/review.model'),
      Game     = require('./../models/game.model'),
      User     = require('./../models/user.model'),
      Genre    = require('./../models/genre.model'),
      Trait    = require('./../models/trait.model'),
      seedData = require('./../data/seedData')

function seedDB() {
  seedGames()
  seedUsers()
  seedGenres()
}

var seedGames = () => {
  Game.remove({}, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Games removed!')
      seedData.games.forEach((seed) => {
        Game.create(seed, (err, game) => {
          if (err) {
            console.log(err)
          } else {
            Review.create(
              {
                text: 'Awesome game',
                author: 'Lucy'
              }, (err, review) => {
                if(err) {
                  console.log(err)
                } else {
                  game.reviews.push(review)
                  game.save()
                  console.log('Review created!')
                }
              }
            )
          }
          console.log('Game created!')
        })
      })
    }
  })
}

var seedUsers = () => {
  User.remove({}, (err) => {
    if (err) {
      console.log(err)
    } else {
      seedData.users.forEach((seed) => {
        var newUser = new User({username: seed.username})
        User.register(newUser, seed.password, (err, user) => {
          if (err) {
            console.log(err)
          } else {
            user.save()
            console.log('User created!')
          }
        })
      })
    }
  })
}

var seedGenres = () => {
  seedData.genres.forEach((seed) => {
    Genre.create(seed, (err, genre) => {
      if (err) {
        console.log(err)
      } else{
        console.log("Genre Created")
        genre.traits.forEach((trait) => {
          Trait.create({
            name: "Combat",
            upvoteScore: 0,
            downvoteScore: 0,
            totalVotes: 0
          }, (err, trait) => {
            if (err) {
              console.log(err)
            } else {
              genre.traits.push(trait)
              genre.save()
              console.log('Trait pushed succesffuly')
            }
          })
        })
      }
    })
  })
}

module.exports = seedDB
