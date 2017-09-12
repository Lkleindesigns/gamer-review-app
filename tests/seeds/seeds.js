const {ObjectID} = require('mongodb')

const User = require('./../../models/user.model')
const Game = require('./../../models/game.model')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()

const users = [
  {
    _id: userOneId,
    username: 'logan@example.com',
    password: 'abc123'
  },
  {
    _id: userTwoId,
    username: 'james@example.com',
    password: '123abc'
  }
]

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save()
    var userTwo = new User(users[1]).save()

    return Promise.all([userOne, userTwo])
  }).then(() => done())
}

module.exports = {users, populateUsers}
