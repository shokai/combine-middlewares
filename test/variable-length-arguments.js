/* eslint-env mocha */

const {assert} = require('chai')
const combineMiddlewares = require('../')

describe('variable length arguments', function () {
  it('support multiple arguments', function () {
    const m1 = (a, b, c, d, results, next) => {
      results.push('m1 called')
      next()
      results.push('m1 end')
    }
    const m2 = (a, b, c, d, results, next) => {
      results.push('m2 called')
      next()
      results.push('m2 end')
    }
    const m3 = (a, b, c, d, results, next) => {
      results.push('m3 called')
      next()
      results.push('m3 end')
    }

    const combined = combineMiddlewares(m1, m2, m3)
    const results = []
    combined(null, null, null, null, results)
    assert.deepEqual(results, [
      'm1 called', 'm2 called', 'm3 called',
      'm3 end', 'm2 end', 'm1 end'
    ])
  })
})
