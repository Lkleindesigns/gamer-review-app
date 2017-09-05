const mongoose = require('mongoose'),
      Review   = require('./../models/review.model'),
      Game     = require('./../models/game.model'),
      User     = require('./../models/user.model'),
      Genre    = require('./../models/genre.model'),
      Trait    = require('./../models/trait.model'),
      seedData = require('./../data/seedData'),
      async    = require('async')

function seedDB() {
  clearAndSeedDB()
}

var clearAndSeedDB = () => {
  console.log("Removing reviews...")
  Review.remove({}, (err) => {
    if (err) { console.log (err) } else { console.log('Reviews removed!') }
  })

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
    if (err) { console.log (err) } else {
      console.log('Traits removed!')
    }
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
          }
        }
        )
      }
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
      }
    })
  })
}

var seedGenres = function () {
  async.mapSeries(seedData.genres, (seed, cb1) => {
    Genre.create({ name: seed.name }, (err, newGenre) => {
    if (err) return cb1(err)
    console.log("Genre Created")
    async.eachSeries(seed.traits, (trait, cb2) => {
      Trait.create({ name: trait.name, upvoteScore: 0, downvoteScore: 0, totalVotes: 0 }, (err, newTrait) => {
        if (err) return cb2(err)
        console.log("Trait Created")
        newGenre.traits.push(newTrait)
        cb2()
      })
    }, (err) => {
        if (err) return cb1(err)
        newGenre.save(cb1)
      })
    })
    },

    // OG Callback
    (err, genres) => {
      if (err) {
        console.log(err)
        return
      }
    console.log('DONE!', genres)
  })
}

module.exports = seedDB
