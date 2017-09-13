/* eslint-env mocha */

const {assert} = require('chai')
const {delay} = require('./helper')
const combineMiddlewares = require('../')

describe('async-await style', function () {
  it('waits next middlewares(s) finish', async function () {
    const m1 = async (results, next) => {
      results.push('m1 called')
      await delay(10)
      await next()
      results.push('m1 end')
    }
    const m2 = async (results, next) => {
      results.push('m2 called')
      await next()
      await delay(10)
      results.push('m2 end')
    }
    const m3 = async (results, next) => {
      results.push('m3 called')
      await delay(10)
      results.push('m3 end')
    }

    const combined = combineMiddlewares(m1, m2, m3)
    const results = []
    await combined(results)
    assert.deepEqual(results, [
      'm1 called', 'm2 called', 'm3 called',
      'm3 end', 'm2 end', 'm1 end'
    ])
  })
})
