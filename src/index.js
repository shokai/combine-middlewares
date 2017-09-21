module.exports = (...middlewares) => (...args) => {
  const chain = middlewares.concat((..._args) => _args.slice(0, args.length))
  const next = (..._args) => chain.shift()(...(_args.length > 0 ? _args : args), next)
  return next()
}
