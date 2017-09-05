const mongoose = require('mongoose')

var gameSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  developer: String,
  publisher: String,
  scoreGamePlay: Number,
  scoreArt: Number,
  scoreSound: Number,
  aggregatedScore: Number,
  pros: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trait"
    }
  ],
  cons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trait"
    }
  ],
  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre"
    }
  ]
})

module.exports = mongoose.model("Game", gameSchema)
