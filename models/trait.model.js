const mongoose = require('mongoose')

var traitSchema = new mongoose.Schema({
  name: String,
  upvoteScore: Number,
  downvoteScore: Number,
  totalVotes: Number
})

module.exports = mongoose.model("Trait", traitSchema)
