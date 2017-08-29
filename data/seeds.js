const mongoose = require('mongoose'),
      Review   = require('./../models/review.model'),
      Game     = require('./../models/game.model')

var data = [
  {
    name: 'Space Wolf',
    image: 'http://wh40k.lexicanum.com/mediawiki/images/thumb/c/c9/Spacewolfnew.jpg/150px-Spacewolfnew.jpg',
    genre: 'Moba',
    description: "Can I drink myself to death on the road to Meereen? I vomited on a girl once, during the act, not proud of it. I suppose I'll have to kill the Mountain myself. No one turns away a Lannister. Don't fight for a king. Don't fight for his kingdoms. Don't fight for honor, don't fight for glory, don't fight for riches, because you won't get any."
  },
  {
    name: 'WolfBlade',
    image: 'http://wh40k.lexicanum.com/mediawiki/images/thumb/4/4e/Wolfblade.jpg/150px-Wolfblade.jpg',
    genre: 'Moba',
    description: 'Blah blah blah'
  },
  {
    name: 'Sons of Fenris',
    image: 'http://wh40k.lexicanum.com/mediawiki/images/thumb/0/02/Sonsoffenris.jpg/150px-Sonsoffenris.jpg',
    genre: 'Moba',
    description: 'Blah blah blah'
  }
]

function seedDB() {
  Game.remove({}, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Games removed!')
      data.forEach((seed) => {
        Game.create(seed, (err, game) => {
          if (err) {
            console.log(err)
          } else {
            console.log('Game created!')
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
        })
      })

    }
  })
}

module.exports = seedDB
