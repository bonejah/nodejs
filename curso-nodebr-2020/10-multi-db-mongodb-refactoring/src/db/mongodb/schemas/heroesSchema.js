const Mongoose = require('mongoose')

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

// module.exports = Mongoose.models.heroes || Mongoose.model('heroes', heroesSchema)
module.exports = Mongoose.model('heroes', heroesSchema)
