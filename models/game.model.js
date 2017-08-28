const mongoose = require('mongoose')

var gameSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  genre: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
})

module.exports = mongoose.model("Game", gameSchema)
