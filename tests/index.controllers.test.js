const expect  = require('expect'),
      request = require('supertest')

const {app} = require('./../app.js'),
      User  = require('./../models/user.model'),
      gameController  = require('./../controllers/games.controller'),
      indexController  = require('./../controllers/index.controller')

// ----- ROUTES ----- //
var game_routes   = require('./../routes/games.routes')
var review_routes = require('./../routes/reviews.routes')
var index_routes  = require('./../routes/index.routes')

app.use('/', index_routes)
app.use('/games/:id/reviews', review_routes)
app.use('/games', game_routes)
// ----- ROUTES ----- //

const {users, populateUsers} = require('./seeds/seeds.js')

beforeEach(populateUsers)

describe('POST /register', () => {
  it('should create a new user', (done) => {
    var username = 'logan@example.com'
    var password = 'abc123'

    request(app)
      .post('/register')
      .send({username, password})
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toExist()
        expect(res.body.username).toBe(username)
      })
      .end(done)
  })
})


