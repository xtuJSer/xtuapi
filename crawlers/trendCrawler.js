const request = require('superagent')
require('superagent-charset')(request)

const trendGetDetails = require('./trendGetDetails'),
  trend = require('../config/default').xtuURL.trend

module.exports = (req, res, target) => {
  let URL = trend.host + trend.path[target],
    charset = 'utf8'

  // 处理在“媒体湘大”域名、编码不统一的问题
  if (target === 'media') {
    URL = URL.replace(/w{3}/g, 'news')
    charset = 'gbk'
  }

  request
    .get(URL)
    .charset(charset)
    .end((err, sres) => {
      if (err) { throw new Error('获取动态失败') }
      trendGetDetails(req, res, target, sres.text)
    })
}
