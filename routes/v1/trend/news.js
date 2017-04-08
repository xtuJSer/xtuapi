const fs = require('fs')
const request = require('superagent')
const cheerio = require('cheerio')

const trendCrawler = require('../../../crawlers/trendCrawler')

module.exports = function (req, res) {
  trendCrawler('news', function (html) {
    // fs.writeFile(__dirname + '/news.html', data)

    let $ = cheerio.load(html),
        ret = [],
        cur = $('.list a')

    for (let i = 0, len = cur.length; i < len; i++) {
      let temp = {},
          $a = $(cur[i])

      temp.href = $a.attr('href')
      temp.title = $a.attr('title')
      temp.time = $a.find('span').text()
      ret.push(temp)
    }
    res.status(200).send(ret)
  })
}