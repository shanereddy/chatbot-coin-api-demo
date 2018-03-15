'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.send('Shane')
})

app.listen(3000, function() {
  console.log('We are live on http://localhost:3000')
})
