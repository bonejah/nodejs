const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')
const PasswordHelper = require('../helpers/passwordHelper')

const failAction = (request, headers, erro) => {
  throw erro;
}

const USER = {
  username: 'blima',
  password: '123'
}

class AuthRoutes extends BaseRoute {

  constructor(secret, db) {
    super()
    this.secret = secret
    this.db = db 
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth: false,
        tags: ['api'],
        description: 'Get Token',
        notes: 'Use this endpoint to get a valid token ',
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
          }
        }
      },
      handler: async (request, headers) => {
        try {
          const { username, password } = request.payload
          
          const [user] = await this.db.read({
            username: username.toLowerCase()
          })

          if (!user) {
            return Boom.unauthorized("User not exists!")
          }

          const match = await PasswordHelper.comparePassword(password, user.password)

          if (!match) {
            return Boom.unauthorized('User/password invalid!')
          }

          // if (username.toLowerCase() !== USER.username || password !== USER.password) {
          //   return Boom.unauthorized()
          // }

          const token = Jwt.sign({
            username: username,
            id: user.id
          }, this.secret)

          return { token }

        } catch (error) {
          console.error('ERROR', error)
          return Boom.internal()
        }
      } 
    }
  }
}

module.exports = AuthRoutes
