const fs = require('fs'),
  path = require('path'),
  request = require('superagent'),
  cheerio = require('cheerio'),
  config = require('../config/default')

require('superagent-charset')(request)

const formatDetails = (details, target) => {
  details = details.map(detail => {
    $ = cheerio.load(detail.html)
    let temp = {}
    temp.title = detail.el.title
    temp.time = detail.el.time
    temp.href = detail.el.href

    let $content
    if (target === 'news' || target === 'media') {
      $content = $('div.content')
    } else if (target === 'notice' || target === 'cathedra') {
      $content = $('.con-tent-box')
    }

    // 按照换行符、制表符对内容进行拆分
    temp.content = require('./trendFormatConent')($content.text().split(/[\r\n\t]/))
    // 若是新闻，则需在内容中添加来源
    target === 'news' && (temp.content.push($($content[0].nextSibling.next).text()))
    // 若是媒体，则需除去最后一行的链接
    target === 'media' && temp.content.length !== 1 && temp.content.pop()
    // 若是讲座、公告，则需除去第一行的标题
    ;(target === 'cathedra' || target === 'notice') && temp.content.shift()

    return temp
  })

  details = require('../filters/index').trendSource(target, details)
  console.log('=== 成功获取动态 ===')
  return details
}

// 并发获取所有详情页的信息
const fetchDetails = (el, charset) => new Promise((resolve, reject) => {
  request
    .get(el.href)
    .charset(charset)
    .end((err, sres) => {
      if (err) { reject(`获取详情失败`) }
      console.log(`正在爬取 ${el.href}`)
      resolve({ html: sres.text, el })
    })
})

module.exports = async (req, res, target, html) => {
  console.log(`正在获取 ${target} 下的数据`)
  let $ = cheerio.load(html),
    list = [],
    $cur = $('.list a'),
    charset = 'utf8'

  // “新闻”和“媒体”下的编码格式为 gbk
    ;(target === 'news' || target === 'media') && (charset = 'gbk')
  // 处理在“媒体湘大”列表类名不统一的问题
  target === 'media' && ($cur = $('.newsgridlist a'))

  // 获取 list 下的数据
  $cur.each(i => {
    let temp = {},
      $a = $($cur[i])

    temp.href = $a.attr('href').indexOf('http') > -1
      ? $a.attr('href')
      : config.xtuURL.trend.host + $a.attr('href')
    temp.title = $a.attr('title')
    temp.time = $a.find('span').text()

    // 处理在“媒体湘大”列表域名、时间不统一的问题
    if (target === 'media') {
      temp.href = temp.href.replace(/w{3}/g, 'news')
      $('li').eq(i).text().trim().replace(/\[(\d{4})\/(\d{2})\/(\d{2})\]/g, function (match, g1, g2, g3) {
        temp.time = [g1, g2, g3].join('-')
      })
    }
    list.push(temp)
  })

  let count = req.params.count || list.length
  count > list.length && (count = list.length)

  let details = []
  for (let i = 0; i < count; i++) {
    if (list[i].href.indexOf('pdf') > -1) { continue }
    details.push(await fetchDetails(list[i], charset))
  }
  details = formatDetails(details, target)
  res.status(200).send(details)
}
