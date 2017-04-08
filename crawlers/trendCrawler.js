const request = require('superagent')

const trendGetOthers = require('./trendGetOthers')
const trend = require('../config/default').xtuUrl.trend

module.exports = function (req, res, target) {
  const url = trend.host + trend.path[target]

  request
    .get(url)
    .end((err, sres) => {
      if (err) { throw new Error('获取动态失败') }
      trendGetOthers(req, res, target, sres.text)
    })
}