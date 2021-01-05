const Hapi = require('hapi')

const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

const Context = require('./db/base/contextStrategy')
const Postgres = require('./db/postgres/postgres')
const HeroSchema = require('./db/postgres/schemas/heroesSchema')
const HeroRoutes = require('./routes/heroRoutes')

async function main() {
  const connection = await Postgres.connect()
  const model = await Postgres.defineModel(connection, HeroSchema)
  const context = new Context(new Postgres(connection, model))

  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
  ])

  await app.start()
  console.log('Server runnning...', app.info.port)
  return app
}

module.exports = main()
