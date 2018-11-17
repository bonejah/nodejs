'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://node-store:node1981@ds027748.mlab.com:27748/node-store')

const Product = require('./models/product-model')

const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', indexRoute)
app.use('/products', productRoute)

module.exports = app;
