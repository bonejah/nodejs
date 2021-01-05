const ICrud = require('../interfaces/interfaceCrud')
const Sequelize = require("sequelize");

// Class Postgres implemented ICrud
class Postgres extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection
    this._schema = schema
  }
  
  async create(hero) {
    const { dataValues } = await this._schema.create(hero)
    return dataValues;
  }

  async read(hero = {} ) {
   return await this._schema.findAll({ where: hero, raw: true })
  }

  async update(id, hero, upsert = false) {
    const fn = upsert ? 'upsert' : 'update'
    return await this._schema[fn](hero, { where: {id} })
  }

  async delete(id) {
    const query = id ? { id } : {}
    return await this._schema.destroy({ where: query })
  }
 
  async isConnected() {
    try {
      await this._connection.authenticate()
      return true;
    } catch (error) {
      console.error('Fail', error)
      return false;
    }
  }

  static async connect() {
    const connection = new Sequelize(process.env.POSTGRES_URL, {
      quoteIdentifiers: false,
      operatorsAliases: false,
      logging: false,
      ssl: process.env.SSL_DB,
      dialectOptions: {
        ssl: process.env.SSL_DB
      }
    });

    console.log("Connection Postgres opened!")

    return connection
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options)
    await model.sync()
    return model 
  }
}

module.exports = Postgres
