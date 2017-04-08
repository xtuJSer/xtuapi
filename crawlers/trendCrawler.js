const request = require('superagent')
const cheerio = require('cheerio')

const getNews = require('./trendNewsCrawler')
const trend = require('../config/default').xtuUrl.trend

module.exports = function (target, cb) {
  const url = trend.host + trend.path[target]

  request
    .get(url)
    .end((err, sres) => {
      if (err) { throw new Error('获取新闻资讯失败') }

      console.log(sres.text)

      switch (target) {
        case 'news':
          return getNews(sres.text)
          break
      }
    })
}