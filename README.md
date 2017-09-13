# combine-middlewares
combine middlewares to one chain, supports async-await and recursive.

- https://github.com/shokai/combine-middlewares
- https://npmjs.com/package/combine-middlewares

[![CircleCI](https://circleci.com/gh/shokai/combine-middlewares.svg?style=svg)](https://circleci.com/gh/shokai/combine-middlewares)


## Usage

```js
const combineMiddlewares = require('combine-middlewares')
```


### recursive async-await
```js
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
```


### express like

```js
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
```

see more examples in `cd ./test`
