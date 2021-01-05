const BaseRoute = require('./base/baseRoute')
const { join } = require('path')

class CoverageRoutes extends BaseRoute {

  constructor() {
    super()
  }

  coverage() {
    return {
      path: '/coverage/{param*}',
      method: 'GET',
      config: {
        auth: false
      },
      handler: {
        directory: {
          path: join(__dirname, '../../coverage'),
          redirectToSlash: true,
          index: true
        }
      }
    }
  }  
  
}

module.exports = CoverageRoutes

