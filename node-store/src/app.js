'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')

const mongoose = require('mongoose')
mongoose.connect(config.connectionString)

const Product = require('./models/product-model')
const Customer = require('./models/customer-model')
const Order = require('./models/order-model')

const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')
const customerRoute = require('./routes/customer-route')
const orderRoute = require('./routes/order-route')

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, x-access-token'),
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
    next();
});

app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)

module.exports = app;
