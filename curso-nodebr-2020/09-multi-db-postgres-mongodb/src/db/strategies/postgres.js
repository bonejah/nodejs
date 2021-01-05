const ICrud = require('../interfaces/interfaceCrud')
const Sequelize = require("sequelize");

// Class Postgres implemented ICrud
class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null
    this._heroes = null
  }
  
  async create(hero) {
    const { dataValues } = await this._heroes.create(hero)
    return dataValues;
  }

  async read(hero = {} ) {
   return await this._heroes.findAll({ where: hero, raw: true })
  }

  async update(id, hero) {
    return await this._heroes.update(hero, { where: {id} })
  }

  async delete(id) {
    const query = id ? { id } : {}
    return await this._heroes.destroy({ where: query })
  }
 
  async isConnected() {
    try {
      await this._driver.authenticate()
      return true;
    } catch (error) {
      console.error('Fail', error)
      return false;
    }
  }

  async connect() {
    this._driver = new Sequelize("heroes", "blima", "123456", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorsAliases: false,
    });

    await this.defineModel()
  }

  async defineModel() {
    this._heroes = this._driver.define(
      "heroes",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          required: true,
        },
        power: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        tableName: "TB_HEROES",
        freezeTableName: false,
        timestamps: false,
      }
    );
  
    await this._heroes.sync()
  }

  
}

module.exports = Postgres