/* eslint-env mocha */

const {assert} = require('chai')
const combineMiddlewares = require('../')

describe('recursive call', function () {
  const double = (num, next) => next(num * 2)
  const minus1 = (num, next) => next(num - 1)
  const plus10 = (num, next) => next(num + 10)

  it('chains middlewares with next(args)', function () {
    const [result] = combineMiddlewares(double, minus1, plus10)(3)
    assert.equal(result, 15)

    const [result2] = combineMiddlewares(plus10, double, minus1, double)(4)
    assert.equal(result2, 54)
  })
})
