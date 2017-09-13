/* eslint-env mocha */

const {assert} = require('chai')
const combineMiddlewares = require('../')

describe('express style middleware', function () {
  const auth = (req, res, next) => {
    if (!req.user) return res.error('no-user')
    next()
  }
  const validate = (req, res, next) => {
    if (!/^[a-zA-Z]+$/.test(req.data)) return res.error('no-alphabet')
    next()
  }
  const upcase = (req, res, next) => {
    res.end(req.data.toUpperCase())
  }
  const combined = combineMiddlewares(auth, validate, upcase)

  it('reject if not user', function (done) {
    combined({data: 'hello'}, {
      error: (err) => {
        assert.equal(err, 'no-user')
        done()
      },
      end: (end) => {
        done('auth middleware is not working')
      }
    })
  })

  it('reject if not alphabet', function (done) {
    combined({user: 'shokai', data: '123'}, {
      error: (err) => {
        assert.equal(err, 'no-alphabet')
        done()
      },
      end: (end) => {
        done('validate middleware is not working')
      }})
  })

  it('upcase alphabets', function (done) {
    combined({user: 'shokai', data: 'hello'}, {
      error: (err) => {
        done('upcase middleware is not working')
      },
      end: (end) => {
        assert.equal(end, 'HELLO')
        done()
      }
    })
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
