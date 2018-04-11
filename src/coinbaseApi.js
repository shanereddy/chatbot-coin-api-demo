'use strict'
const request = require('superagent')

function priceOf(coinName) {
  return new Promise(function(resolve, reject) {
    const coinIdentifier = lookupCoinName(coinName)

    if (!coinIdentifier) {
      reject('No coin found with that name')
    }

    request
      .get('https://coinbin.org/' + coinIdentifier)
      .then(function(res) {
        resolve(res.body)
        // res.body, res.headers, res.status
      })
      .catch(function(err) {
        reject(err.message)
        // err.message, err.response
      })
  })
}

function lookupCoinName(coinName) {
  const fs = require('fs')
  const obj = JSON.parse(fs.readFileSync('./lookups/coins.json', 'utf8'))

  if (obj[coinName]) {
    console.log('coin: ' + obj[coinName])
    return obj[coinName]
  }
}

module.exports = { priceOf }
