const expect  = require('expect'),
      request = require('supertest')

const {app} = require('./../app.js'),
      User  = require('./../models/user.model'),
      Game  = require('./../controllers/games.controller'),
      Index  = require('./../controllers/index.controller')

const {users, populateUsers} = require('./seeds/seeds.js')

beforeEach(populateUsers)
console.log(users)

describe('POST /register - createUser', () => {
  it('should create new user', (done) => {
    var email = 'example@example.com'
    var password = 'abc123'

    request(app)
      .post('/register')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toExist()
        expect(res.body.email).toBe(email)
      })
      .end((err) => {
        if (err) {
          return done(err)
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist()
          expect(user.password).toNotBe(password)
          done()
        }).catch((e) => done(e))
      })
  })

  it('should not save duplicate user', (done) => {
    request(app)
      .post('/register')
      .send({
        email: users[0].email,
        password: 'Password123'
      })
      .expect(400)
      .end(done)
  })

  it('should return validation error if request invalid', (done) => {
    request(app)
      .post('/register')
      .send({
        email: 1,
        password: undefined
      })
      .expect(400)
      .end(done)
  })
})


describe('POST /login - loginUser', () => {
  it('should login user', (done) => {
    request(app)
      .post('/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .end(done)
  })

  it('should reject invalid login', (done) => {
    request(app)
      .post('/login')
      .send({
        email: users[1].email,
        password: 'alk;fjalkfj'
      })
      .expect(400)
      .end(done)
  })
})
