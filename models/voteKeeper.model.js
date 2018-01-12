const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var VoteKeeperSchema = new mongoose.Schema({
  name: String,
  trait: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    voteType: String
  }
})

VoteKeeperSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('VoteKeeper', VoteKeeperSchema)
