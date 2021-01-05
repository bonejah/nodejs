const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')

const failAction = (request, headers, erro) => {
  throw erro;
}

const USER = {
  username: 'blima',
  password: '123'
}

class AuthRoutes extends BaseRoute {

  constructor(secret) {
    super()
    this.secret = secret
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
          
          if (username.toLowerCase() !== USER.username || password !== USER.password) {
            return Boom.unauthorized()
          }

          const token = Jwt.sign({
            username: username,
            id: 1
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
