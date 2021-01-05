const assert = require('assert')
const api = require("../src/api");
const Context = require('../src/db/base/contextStrategy')
const Postgres = require('../src/db/postgres/postgres')
const UserSchema = require('../src/db/postgres/schemas/userSchema')

const USER_TO_SAVE = {
  username: 'blima',
  password: '123'
}

const USER_DB = {
  username: USER_TO_SAVE.username.toLowerCase(),
  password: '$2b$04$IpGRjI6X.v7YRywVU9yFlu5RCg3w4zrAwrNLVHaGjz.Ur1c0od7Lq'
}

let app = {}

describe('Auth test suit', function() {
  this.beforeAll(async() => {
    app = await api

    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, UserSchema)
    const context = new Context(new Postgres(connection, model))
    const result = await context.update(null, USER_DB, true)

  })

  it('should get a token', async() => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER_TO_SAVE
    })

    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)

    assert.deepEqual(statusCode, 200)
    assert.ok(data.token.length > 10)
  })

  it('should return not authorized usign a wrong credentials', async() => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'lelelinguica',
        password: '123'
      }
    })

    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)

    assert.deepEqual(statusCode, 401)
    assert.ok(data.error, "Unauthorized")
  })

})