const request = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')

const header = require('../config/default').header
const user = require('../config/default').xtuUrl.user

module.exports = (req, res) => {
  const rankUrl = user.host + user.path.rank
  const YEAR = [
    '2014-2015-1',
    '2014-2015-2',
    '2015-2016-1',
    '2015-2016-2',
    '2016-2017-1'
  ]
  const prop = ['all', '7', '1']

  let fullYear = req.body.fullYear || '2016-2017-1'
  fullYear.indexOf('&') > -1 && (year = fullYear.replace(/&/g, '&kksj='))

  let ep = new eventproxy()
  ep.after('getHtml', prop.length, (htmlArr) => {
    let result = []
    htmlArr.map((htmlObj) => {
      let { html, propEl } = htmlObj,
          $ = cheerio.load(html),
          obj = {},
          table = []

      obj.year = fullYear
      if (propEl.length === 1) { obj.prop = propEl === '1' ? '必修' : '选修' }
      else { obj.prop = '综合' }

      $('#dataList tr').find('th').each((i, th) => {
        table[i] = {}
        table[i].title = $(th).text()
      })
      $('#dataList tr').find('td').each((i, td) => {
        table[i].num = $(td).text()
      })
      obj.table = table
      result.push(obj)
    })
    // result.sort((a, b) => a.year > b.year ? 1 : -1)
    console.log('=== 成功获取排名 ===')
    res.status(200).json(result)
  })

  prop.map((propEl, pid) => {
    request.post(rankUrl)
      .set(header)
      .set('Cookie', req.session.xtu)
      .send(`kksj=${ year }&kclb=${ propEl = propEl !== 'all' ? propEl : '1&kclb=7' }&zsb=0`)
      .end((err, sres) => {
        if (err) { throw new Error(`获取排名失败 ${err}`) }
        ep.emit('getHtml', { html: sres.text, propEl })
      })
  })
}