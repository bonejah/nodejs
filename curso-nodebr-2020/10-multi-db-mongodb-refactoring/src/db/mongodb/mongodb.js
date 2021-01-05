const ICrud = require("../interfaces/interfaceCrud");
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
  constructor(connection, schema) {
    super();
    this._connection = connection
    this._schema = schema
  }

  async isConnected() {
    const state = STATUS_DB_MONGO[this._connection.readyState]
    if (state === 'Connected') return state;
    if (state !== 'Connecting') return state;
    
    await new Promise(resolve => setTimeout(resolve, 1000))

    return STATUS_DB_MONGO[this._connection.readyState]
  }

  static connect() {
    Mongoose.connect(
      mongoUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error) => {
        if (!error) return;
        console.log("ERROR", error);
      }
    );

    const connection = Mongoose.connection;
    connection.once("open", () => console.log("Connection opened!"));
    return connection
  }

  async create(hero) {
    return await this._schema.create(hero)
  }

  async read(hero, skip=0, limit=10) {
    return await this._schema.find(hero).skip(skip).limit(limit) 
  }

  async update(id, hero) {
    return await this._schema.updateOne({ _id: id }, { $set: hero })
  }

  async delete(id) {
    return await this._schema.deleteOne({ _id: id})
  }

}

module.exports = MongoDB;
