'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const coinbaseApi = require('./coinbaseApi')
const request = require('superagent')

const app = express()

app.use(bodyParser.json())

app.use('/price', function(req, res) {
  coinbaseApi
    .priceOf()
    .then(function(response) {
      res.json(response)
    })
    .catch(function(error) {
      res.json(error)
    })
})

app.listen(3000, function() {
  console.log('We are live on http://localhost:3000')
})
