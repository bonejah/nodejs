const Hapi = require('hapi')
const Context = require('./db/base/contextStrategy')
const MongoDB = require('./db/mongodb/mongodb')
const HeroSchema = require('./db/mongodb/schemas/heroesSchema')

const app = new Hapi.Server({
  port: 5000
})

async function main() {
  const connection = await MongoDB.connect()
  const context = new Context(new MongoDB(connection, HeroSchema))

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
