
const mongoose = require('mongoose')

var genreSchema = new mongoose.Schema({
  name: String,
  traits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trait"
    }
  ]
})

module.exports = mongoose.model("Genre", genreSchema)
