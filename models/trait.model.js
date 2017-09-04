const mongoose = require('mongoose')

var traitSchema = new mongoose.Schema({
  name: String,
  upvoteScore: Number,
  downvoteScore: Number,
  totalVotes: Number
})

mondule.exports = mongoose.model("Trait", traitSchema)
