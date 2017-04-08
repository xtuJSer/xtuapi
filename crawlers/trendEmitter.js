const request = require('superagent')
const cheerio = require('cheerio')

const trend = require('../config/default').xtu.trend

module.exports = function (target, cb) {
  const url = trend.host + trend.path[target]

  request
    .get(url)
    .end((err, sres) => {
      if (err) { throw new Error('获取新闻资讯失败') }

      console.log(sres.text)
      // cb(sres.text)
    })
}