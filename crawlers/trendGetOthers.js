const fs = require('fs')
const request = require('superagent')
const charset = require('superagent-charset')
charset(request)
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')

module.exports = function (req, res, target, html) {
  console.log(`正在获取 ${target} 下的数据`)
  let $ = cheerio.load(html),
      list = [],
      $cur = $('.list a')

  // 获取新闻页下的数据
  for (let i = 0, len = $cur.length; i < len; i++) {
    let temp = {},
        $a = $($cur[i])

    temp.href = $a.attr('href')
    temp.title = $a.attr('title')
    temp.time = $a.find('span').text()
    list.push(temp)
  }
  console.log(list)

  // 并发获取所有详情页的信息
  let ep = new eventproxy(),
      count = req.params.count || list.length
  ep.after('getDetail', count, function (details) {
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

  list.forEach(el => {
    request
      .get(el.href)
      .charset('gbk')
      .end((err, sres) => {
        if (err) { throw new Error(`获取 ${target} 详情失败`)}
        console.log(`成功获取 ${el.href}`)
        ep.emit('getDetail', { html: sres.text, el })
      })
  })
}