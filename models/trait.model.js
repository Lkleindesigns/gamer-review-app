const mongoose = require('mongoose')

var traitSchema = new mongoose.Schema({
  name: String,
  upvoteScore: Number,
  downvoteScore: Number,
  totalVotes: Number
})

var Trait = mongoose.model("Trait", traitSchema)

module.exports = Trait
