const request = require('superagent')

const trend = require('../config/default').xtuUrl.trend

module.exports = function (target, cb) {
  const url = trend.host + trend.path[target]

  request
    .get(url)
    .end((err, sres) => {
      if (err) { throw new Error('获取动态失败') }
      cb(sres.text)
    })
}