const Hapi = require('hapi')
const HapiSwagger = require('hapi-swagger')
const HapiJWT = require('hapi-auth-jwt2')
const Vision = require('vision')
const Inert = require('inert')
const Context = require('./db/base/contextStrategy')
const MongoDB = require('./db/mongodb/mongodb')
const HeroSchema = require('./db/mongodb/schemas/heroesSchema')
const HeroRoutes = require('./routes/heroRoutes')
const AuthRoutes = require('./routes/authRoutes')

const app = new Hapi.Server({
  port: 5000
})

const JWT_SECRET = 'MY_SECRET'

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = await MongoDB.connect()
  const context = new Context(new MongoDB(connection, HeroSchema))

  const swaggerOptions = {
    info: {
      title: 'API Hero - #CursoNodeBR',
      version: 'v1.0'
    },
    lang: 'en'
  }

  await app.register([
    HapiJWT,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // },
    validate: (data, request) => {
      // verify on db if user is active
      // verify on db if user is keep paying

      return {
        isValid: true // case invalid set with false
      }
    }
  })

  app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
    ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods()),
  ])

  await app.start()
  console.log('Server runnning...', app.info.port)
  return app
}

module.exports = main()

