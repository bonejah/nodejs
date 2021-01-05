const Hapi = require('hapi')

const app = new Hapi.Server({
  port: 5000
})

const Context = require('./db/base/contextStrategy')
const Postgres = require('./db/postgres/postgres')
const HeroSchema = require('./db/postgres/schemas/heroesSchema')

async function main() {
  const connection = await Postgres.connect()
  const model = await Postgres.defineModel(connection, HeroSchema)
  const context = new Context(new Postgres(connection, model))


  app.route([
    {
      path: '/heroes',
      method: 'GET',
      handler: (request, head) => {
        return context.read()
      }
    }
  ])

  await app.start()
  console.log('Server runnning...', app.info.port)
}

main()
