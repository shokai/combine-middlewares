/* eslint-env mocha */

const {assert} = require('chai')
const {delay} = require('./helper')
const combineMiddlewares = require('../')

describe('recursive async-await', function () {
  it('waits next async middleware(s) return value', async function () {
    const double = async (num, next) => {
      await delay(10)
      return next(num * 2)
    }
    const minus1 = async (num, next) => {
      await delay(10)
      return next(num - 1)
    }
    const plus10 = async (num, next) => {
      await delay(10)
      return next(num + 10)
    }

    const [result] = await combineMiddlewares(double, minus1, plus10)(3)
    assert.equal(result, 15)
  })
})
