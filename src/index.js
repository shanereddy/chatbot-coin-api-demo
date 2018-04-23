'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const coinbaseApi = require('./coinbaseApi')

const app = express()

app.use(bodyParser.json())

app.use('/price', function(req, res, next) {
  var responseText = ''
  const intentName = req.body.result.metadata.intentName
  console.log('intentName: ' + intentName)

  if (intentName === 'crypto-price') {
    console.log('We are in the crypto-price intent')
    const coinName = req.body.result.parameters['cryptocurrency-name']
    coinbaseApi
      .priceOf(coinName)
      .then(function(response) {
        console.log('coinbase response usd: ' + response.coin.usd)
        responseText = 'The price of your coin is $' + response.coin.usd
        res.json({ speech: responseText, displayText: responseText })
      })
      .catch(function() {
        responseText = 'There was an error in retrieving the price of your coin'
        res.json({ speech: responseText, displayText: responseText })
      })
  } else if (intentName === 'conversion.context') {
    console.log('We are in the conversion.context intent')
    const fromCoin = req.body.result.parameters['current-cryptocurrency-name']
    const toCoin = req.body.result.parameters['cryptocurrency-name']
    coinbaseApi
      .exchangeRate(fromCoin, toCoin)
      .then(function(response) {
        responseText = fromCoin + ' is ' + response.coin.exchange_rate.toFixed(10) + ' ' + toCoin
        res.json({ speech: responseText, displayText: responseText })
      })
      .catch(function() {
        responseText = 'There was an error converting your crytocurrency'
        res.json({ speech: responseText, displayText: responseText })
      })
  } else {
    responseText = 'We havent catered for the intent yet!'
    res.json({ speech: responseText, displayText: responseText })
  }
})

app.listen(3000, function() {
  console.log('We are live on http://localhost:3000')
})
