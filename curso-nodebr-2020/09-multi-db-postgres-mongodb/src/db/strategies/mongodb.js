const ICrud = require("./../interfaces/interfaceCrud");
const Mongoose = require("mongoose");

const mongoUri = "mongodb://localhost:27017/heroes";
// const mongoUri = 'mongodb://bonejah:123456@localhost:27017/heroes'

const STATUS_DB_MONGO = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting'
}

// Class Mongo implemented ICrud
class MongoDB extends ICrud {
  constructor() {
    super();
    this._heroes = null
    this._driver = null
  }

  async isConnected() {
    const state = STATUS_DB_MONGO[this._driver.readyState]
    if (state === 'Connected') return state;
    if (state !== 'Connecting') return state;
    
    await new Promise(resolve => setTimeout(resolve, 1000))

    return STATUS_DB_MONGO[this._driver.readyState]
  }

  defineModel() {
    const heroesSchema = new Mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      power: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    });
    
    // this._heroes = Mongoose.model('heroes', heroesSchema)
    this._heroes = Mongoose.models.heroes || Mongoose.model('heroes', heroesSchema)
  }

  connect() {
    Mongoose.connect(
      mongoUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error) => {
        if (!error) return;
        console.log("ERROR", error);
      }
    );

    this._driver = Mongoose.connection;
    this._driver.once("open", () => console.log("Connection opened!"));
    this.defineModel()
  }

  async create(hero) {
    return await this._heroes.create(hero)
  }

  async read(hero, skip=0, limit=10) {
    return await this._heroes.find(hero).skip(skip).limit(limit) 
  }

  async update(id, hero) {
    return await this._heroes.updateOne({ _id: id }, { $set: hero })
  }

  async delete(id) {
    return await this._heroes.deleteOne({ _id: id})
  }

}

module.exports = MongoDB;
