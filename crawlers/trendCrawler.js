const request = require('superagent')
const charset = require('superagent-charset')
charset(request)

const trendGetDetails = require('./trendGetDetails-Alpha')
const trend = require('../config/default').xtuUrl.trend

module.exports = (req, res, target) => {
  let url = trend.host + trend.path[target],
      charset = 'utf8'

  // 处理在“媒体湘大”域名、编码不统一的问题
  if (target === 'media') {
    url = url.replace(/w{3}/g, 'news')
    charset = 'gbk'
  }

  request
    .get(url)
    .charset(charset)
    .end((err, sres) => {
      if (err) { throw new Error('获取动态失败') }
      trendGetDetails(req, res, target, sres.text)
    })
}
