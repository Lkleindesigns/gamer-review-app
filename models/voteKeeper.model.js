const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose')

var VoteKeeperSchema = new mongoose.Schema({
  votedOnTraits: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trait"
    },
    voteType: String
  }
})

VoteKeeperSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('VoteKeeper', VoteKeeperSchema)
