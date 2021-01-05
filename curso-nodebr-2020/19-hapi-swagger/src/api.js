// npm i vision inert hapi-swagger

const Hapi = require('hapi')

const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

const Context = require('./db/base/contextStrategy')
const MongoDB = require('./db/mongodb/mongodb')
const HeroSchema = require('./db/mongodb/schemas/heroesSchema')
const HeroRoutes = require('./routes/heroRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

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
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  app.route(mapRoutes(new HeroRoutes(context), HeroRoutes.methods()))

  await app.start()
  console.log('Server runnning...', app.info.port)
  return app
}

module.exports = main()

