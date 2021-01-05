// npm install mongoose
const Mongoose = require("mongoose");

const mongoUri = "mongodb://localhost:27017/heroes";
// const mongoUri = 'mongodb://bonejah:123456@localhost:27017/heroes'

Mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (!error) return;
    console.log("ERROR", error);
  }
);

const connection = Mongoose.connection;

// Examples Functions
// function myFunction() { }
// const myFunction = function () { }
// const myFunctionArrow = () => { }
// const myFunctionArrow = (params) => { console.log(params) }
// const myFunctionArrow = (params) => console.log(params)

connection.once("open", () => console.log("Connection opened!"));

setTimeout(() => {
  const state = connection.readyState;
}, 1000);

// Legend connection.readyState
/**
 * 0 - Disconnected
 * 1 - Connected
 * 2 - Connecting
 * 3 - Disconnecting
 */

const heroeSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: new Date()
  }
});

const model = Mongoose.model('heroes', heroeSchema)

async function main() {
  const result = await model.create({
    name: 'Green Lantern',
    power: 'Willpower'
  })

  const listResult = await model.find()
}

main()






