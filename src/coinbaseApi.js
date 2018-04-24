'use strict'
const request = require('superagent')
const chalk = require('chalk')

const API_URI = 'https://coinbin.org/'

function priceOf(coinName) {
  console.log(chalk.black.bgBlue('Checking price of ' + coinName))
  return new Promise(function(resolve, reject) {
    const coinIdentifier = lookupCoinName(coinName)

    if (!coinIdentifier) {
      reject('No coin found with that name')
    }

    request
      .get(API_URI + coinIdentifier)
      .then(function(res) {
        resolve(res.body)
      })
      .catch(function(err) {
        reject(err.message)
      })
  })
}

function exchangeRate(fromCoin, toCoin) {
  return new Promise(function(resolve, reject) {
    const fromCoinIdentifier = lookupCoinName(fromCoin)
    const toCoinIdentifier = lookupCoinName(toCoin)
    console.log(chalk.black.bgBlue('Doing conversion from ' + fromCoin + ' to ' + toCoin))

    if (!fromCoinIdentifier) {
      reject(fromCoin + ' does not exist')
    }

    if (!toCoinIdentifier) {
      reject(toCoin + ' does not exist')
    }

    // console.log('url:', API_URI + fromCoinIdentifier + '/to/' + toCoinIdentifier)
    request
      .get(API_URI + fromCoinIdentifier + '/to/' + toCoinIdentifier)
      .then(function(res) {
        resolve(res.body)
      })
      .catch(function(err) {
        reject(err.message)
      })
  })
}

function lookupCoinName(coinName) {
  const fs = require('fs')
  const obj = JSON.parse(fs.readFileSync('./lookups/coins.json', 'utf8'))

  if (obj[coinName]) {
    // console.log('coin: ' + obj[coinName])
    return obj[coinName]
  }
}

module.exports = { priceOf, exchangeRate }
