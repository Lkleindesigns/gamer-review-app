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
    }
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

var seedGames = function () {

  async.mapSeries(seedData.games, function(game, callback1) {

    Game.create({ name: game.name, image: game.image, desc: game.desc }, function(err, newGame) {
      if (err) { return callback1(err) }

      async.mapSeries(game.genres, function(genre, callback2) {
        Genre.create({ name: genre.name }, function(err, newGenre) {
          if (err) { return callback2(err) }

          async.eachSeries(genre.traits, function(trait, callback3) {
            Trait.create({ name: trait.name, upvoteScore: 0, downvoteScore: 0, totalVotes: 0 }, function(err, newTrait) {
              if (err) { return callback3(err) }

              newGenre.traits.addToSet(newTrait)
              callback3()
            })
          }, function(err) { if (err) return callback2(err); newGenre.save() })

          newGame.genres.addToSet(newGenre)
          callback2()
        })
      }, function(err) { if (err) return callback1(err); newGame.save() })
    })
  }, function(err, games) { if (err) { return console.log(err) }
     console.log('DONE!', games)
  })

}

module.exports = seedDB
