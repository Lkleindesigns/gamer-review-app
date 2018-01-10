const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  votedOnTraits: [
    {
      trait: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trait"
      },
      voteType: String
    }
    ]
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
