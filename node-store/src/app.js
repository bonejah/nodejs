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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)

module.exports = app;
