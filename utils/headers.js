const { headers, userAgent } = require('../config')

headers['User-Agent'] = userAgent[~~(userAgent.length * Math.random())]

module.exports = headers
