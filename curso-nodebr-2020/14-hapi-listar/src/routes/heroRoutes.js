const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super()
    this.db = db
  }

  list() {
    return {
      path: '/heroes',
      method: 'GET',
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query

          let query = {}
          if (name) {
            query.name = name
          }

          if(isNaN(skip))
            throw Error('typeof skip is incorrect')

          if(isNaN(limit))
            throw Error('typeof limit is incorrect')  

          return this.db.read( query, parseInt(skip), parseInt(limit))
          
        } catch (error) {
          console.error('ERROR', error)
          return "Internal error Server"
        }
      }
    }
  }
}

module.exports = HeroRoutes
