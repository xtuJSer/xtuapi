const fs = require('fs')
const request = require('superagent')
const charset = require('superagent-charset')
charset(request)
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')

const trendCrawler = require('../../../crawlers/trendCrawler')

module.exports = function (req, res) {
  trendCrawler('news', function (html) {
    let $ = cheerio.load(html),
        newsList = [],
        $cur = $('.list a')

    // 获取新闻页下的数据
    for (let i = 0, len = $cur.length; i < len; i++) {
      let temp = {},
          $a = $($cur[i])

      temp.href = $a.attr('href')
      temp.title = $a.attr('title')
      temp.time = $a.find('span').text()
      newsList.push(temp)
    }

    // 并发获取所有详情页的信息
    let ep = new eventproxy(),
        count = req.params.count || newsList.length
    ep.after('getNewsDetail', count, function (details) {
      details = details.map(detail => {
        $ = cheerio.load(detail.html)
        let temp = {}
        temp.title = detail.el.title
        temp.time = detail.el.time
        temp.content = []

        let $content = $('.newsshow .content'),
            // imgs = $content.find('img'),
            ps = $content.find('p')

        for (let i = 0, len = ps.length; i < len; i++) {
          let $p = $(ps[i])
          temp.content.push($p.text().trim())
        }
        return temp
      })
      res.status(200).send(details)
    })

    newsList.forEach(el => {
      request
        .get(el.href)
        .charset('gbk')
        .end((err, sres) => {
          if (err) { throw new Error('获取新闻详情失败')}
          console.log(`成功获取 ${el.href}`)
          ep.emit('getNewsDetail', { html: sres.text, el })
        })
    })
  })
}