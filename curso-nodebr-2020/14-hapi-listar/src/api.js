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

async function main() {
  const connection = await MongoDB.connect()
  const context = new Context(new MongoDB(connection, HeroSchema))

  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
  ])

  await app.start()
  console.log('Server runnning...', app.info.port)
  return app
}

module.exports = main()
