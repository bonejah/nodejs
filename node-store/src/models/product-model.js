'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: [true, 'O title é obrigatório'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'O slug é obrigatório'],
    trim: true,
    index: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'O description é obrigatório']
  },
  price: {
    type: Number,
    required: [true, 'O price é obrigatório']
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  tags: [{
    type: String,
    required: [true, 'As tags são obrigatórias']
  }]
})


module.exports = mongoose.model('Product', schema)