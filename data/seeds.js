const mongoose = require('mongoose'),
Review   = require('./../models/review.model'),
Game     = require('./../models/game.model'),
User     = require('./../models/user.model'),
Genre    = require('./../models/genre.model'),
Trait    = require('./../models/trait.model'),
seedData = require('./../data/seedData')

function seedDB() {
  clearAndSeedDB()
}

var clearAndSeedDB = () => {
  console.log("Removing games...")
  Game.remove({}, (err) => {
    if (err) { console.log (err) } else {
      console.log('Games removed!')
      seedGames()
    }
  })

  console.log("Removing users...")
  User.remove({}, (err) => {
    if (err) { console.log (err) } else {
      console.log('Users removed!')
      seedUsers()
    }
  })

  console.log("Removing traits...")
  Trait.remove({}, (err) => {
    if (err) { console.log (err) } else { console.log('Traits removed!') }
  })

  console.log("Removing genres...")
  Genre.remove({}, (err) => {
    if (err) { console.log (err) } else {
      console.log('Genres removed!')
      seedGenres()
    }
  })
}

var seedGames = () => {
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

var seedUsers = () => {
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

var seedGenres = () => {
  seedData.genres.forEach((seed) => {
    Genre.create({
      name: seed.name
    }, (err, newGenre) => {
      if (err) {
        console.log(err)
      } else{
        console.log("Genre Created")
        seed.traits.forEach((trait) => {
          Trait.create({
            name: trait.name,
            upvoteScore: 0,
            downvoteScore: 0,
            totalVotes: 0
          }, (err, newTrait) => {
            if (err) {
              console.log(err, newTrait)
            } else {
              console.log("********************************************************")
              console.log("pushing: " + trait.name + " into: " + newGenre.name)
              newGenre.traits.addToSet(newTrait)
              newGenre.save()
            }
          })
        })
      }
    })
  })
}

module.exports = seedDB
