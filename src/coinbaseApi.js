'use strict'
const request = require('superagent')

function priceOf(coinName) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://coinbin.org/' + coinName)
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

module.exports = { priceOf }
