'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório']
  },
  password: {
    type: String,
    required: [true, 'O password é obrigatório']
  },
})

module.exports = mongoose.model('Customer', schema)