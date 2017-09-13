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
        done(['auth middleware is not working', end])
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
        done(['validate middleware is not working', end])
      }})
  })

  it('upcase alphabets', function (done) {
    combined({user: 'shokai', data: 'hello'}, {
      error: (err) => {
        done(['upcase middleware', err])
      },
      end: (end) => {
        assert.equal(end, 'HELLO')
        done()
      }
    })
  })
})
