const { config } = require('dotenv')
const { join } = require('path')
const { ok } = require('assert')

const env = process.env.NODE_ENV || "dev"
console.log('ENV', env)
ok(env === "prod" || env === "dev", "env value is invalid!!")

const configPath = join(__dirname, '../config', `.env.${env}`)
console.log('CONFIGPATH>>>', configPath)

config({path: configPath })



const Hapi = require('hapi')
const HapiSwagger = require('hapi-swagger')
const HapiJWT = require('hapi-auth-jwt2')
const Vision = require('vision')
const Inert = require('inert')
const Context = require('./db/base/contextStrategy')
const MongoDB = require('./db/mongodb/mongodb')
const Postgres = require('./db/postgres/postgres')
const UserSchema = require('./db/postgres/schemas/userSchema')
const HeroSchema = require('./db/mongodb/schemas/heroesSchema')
const HeroRoutes = require('./routes/heroRoutes')
const AuthRoutes = require('./routes/authRoutes')

const app = new Hapi.Server({
  port: process.env.PORT
})

const JWT_SECRET = process.env.JWT_SECRET

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = await MongoDB.connect()
  const context = new Context(new MongoDB(connection, HeroSchema))

  const connectionPostgres = await Postgres.connect()
  const modelPostgres = await Postgres.defineModel(connectionPostgres, UserSchema)
  const contextPostgres = new Context(new Postgres(connectionPostgres, modelPostgres))

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
    validate: async (data, request) => {
      // verify on db if user is active
      const [result] = await contextPostgres.read({
        username: data.username.toLowerCase()
      })

      if(!result) {
        return {
          isValid: false
        }
      }

      return {
        isValid: true // case invalid set with false
      }
    }
  })

  app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
    ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods()),
  ])

  await app.start()
  console.log('Server runnning...', app.info.port)
  return app
}

module.exports = main()

