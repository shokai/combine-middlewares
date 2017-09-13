module.exports = {}

module.exports.delay = (msec) => new Promise(resolve => setTimeout(resolve, msec))
