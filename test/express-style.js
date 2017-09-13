/* eslint-env mocha */

const {assert} = require('chai')
const {delay} = require('./helper')
const combineMiddlewares = require('../')

describe('express style middleware', function () {
  it('combines middlewares', function () {
    const m1 = (results, next) => {
      results.push('m1 called')
      next()
    }
    const m2 = (results, next) => {
      results.push('m2 called')
      next()
    }
    const m3 = (results, next) => {
      results.push('m3 called')
      next()
    }

    const combined = combineMiddlewares(m1, m2, m3)
    const results = []
    combined(results)
    assert.deepEqual(results, ['m1 called', 'm2 called', 'm3 called'])
  })

  it('combine multiple argument middlewares', function () {
    const m1 = (a, b, results, next) => {
      results.push('m1 called')
      next()
    }
    const m2 = (a, b, results, next) => {
      results.push('m2 called')
      next()
    }
    const m3 = (a, b, results, next) => {
      results.push('m3 called')
      next()
    }

    const combined = combineMiddlewares(m1, m2, m3)
    const results = []
    combined(null, null, results)
    assert.deepEqual(results, ['m1 called', 'm2 called', 'm3 called'])
  })
})
