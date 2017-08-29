const {ObjectID} = requir('mongodb')

const User = require('./../../models/user.model')
const Game = require('./../../models/game.model')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()

const users = [
  {
    _id: userOneId,
    email: 'logan@example.com',
    password: 'abc123'
  },
  {
    _id: userTwoId,
    email: 'james@example.com',
    password: '123abc'
  }
]

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save()
    var userTwo = new User(users[1]).save()
  })
}

module.exports = {users, populateUsers}
