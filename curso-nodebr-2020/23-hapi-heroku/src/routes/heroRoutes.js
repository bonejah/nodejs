const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const failAction = (request, headers, erro) => {
  throw erro;
}

const headers = Joi.object({
  authorization: Joi.string().required()
}).unknown()

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
        tags: ['api'],
        description: 'List heroes',
        notes: 'You can use pagination and filter by name',
        validate: {
          failAction,
          query: Joi.object({
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            name: Joi.string().min(3).max(100)
          }),
          headers
        }
      },
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query
          const query = name ? { name: {$regex: `.*${name}*.`} } : {}
          return this.db.read(query, skip, limit)
        } catch (error) {
          console.error('ERROR', error)
          return Boom.internal()
        }
      }
    }
  }

  create() {
    return {
      path: '/heroes',
      method: 'POST',
      config: {
        tags: ['api'],
        description: 'Save a heroe',
        notes: 'Use this endpoint to save a hero',
        validate: {
          failAction,
          payload: {
            name: Joi.string().required().min(3).max(100),
            power: Joi.string().required().min(2).max(20),
          },
          headers
        }
      },
      handler: async (request) => {
        try {
          const {name, power } = request.payload
          const result = await this.db.create({ name, power })
          return {
            message: "Hero saved with success!",
            _id: result._id
          }
        } catch (error) {
          console.error('Error', error)
          return Boom.internal()
        }
      }
    }
  }

  update() {
    return {
      path: '/heroes/{id}',
      method: 'PATCH',
      config: {
        tags: ['api'],
        description: 'Update a heroe',
        notes: 'Use this endpoint to update a hero',
        validate: {
          failAction,
          params: {
            id: Joi.string().required()
          },
          payload: {
            name: Joi.string().min(3).max(100),
            power: Joi.string().min(2).max(20),
          },
          headers
        }
      },
      handler: async (request) => {
        try {
          const { id } = request.params
          const { payload } = request
          const dataString = JSON.stringify(payload)
          const dataJson = JSON.parse(dataString)
          const result = await this.db.update(id, dataJson)

          if (result.nModified !== 1) return Boom.preconditionFailed("It was not possible to update a hero")

          return {
            message: 'Hero updated with success!'
          }
        } catch (error) {
          console.error("Error", error)
          return Boom.internal()
        }
      }
    }
  }

  delete() {
    return {
      path: '/heroes/{id}',
      method: 'DELETE',
      config: {
        tags: ['api'],
        description: 'Remove a heroe',
        notes: 'Use this endpoint to remove a hero',
        validate: {
          failAction,
          params: {
            id: Joi.string().required()
          },
          headers
        }
      },
      handler: async (request) => {
        try {
          const { id } = request.params
          const result = await this.db.delete(id)
          
          if (result.n !== 1) return Boom.preconditionFailed("It was not possible to remove a hero")

          return {
            message: 'Hero removed with success!'
          }
        } catch (error) {
          console.error("Error", error)
          return Boom.internal()
        }
      }
    }
  }
}

module.exports = HeroRoutes
