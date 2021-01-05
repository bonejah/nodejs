const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction = (request, headers, erro) => {
  throw erro;
}

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super()
    this.db = db
  }

  list() {
    return {
      path: '/heroes',
      method: 'GET',
      config: {
        validate: {
          failAction,
          query: Joi.object({
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            name: Joi.string().min(3).max(100)
          })
        }
      },
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query

          const query = name ? { name: {$regex: `.*${name}*.`} } : {}

          return this.db.read(query, skip, limit)
        } catch (error) {
          console.error('ERROR', error)
          return "Internal error Server"
        }
      }
    }
  }

  create() {
    return {
      path: '/heroes',
      method: 'POST',
      config: {
        validate: {
          failAction,
          payload: {
            name: Joi.string().min(3).max(100),
            power: Joi.string().min(2).max(20),
          }
        }
      },
      handler: async (request) => {
        try {
          const {name, power } = request.payload
          const result = await this.db.create({ name, power })
          return {
            message: "Hero save with success!",
            _id: result._id
          }
        } catch (error) {
          console.error('Error', error)
          return "Internal Server Error"
        }
      }

    }
  }
}

module.exports = HeroRoutes
