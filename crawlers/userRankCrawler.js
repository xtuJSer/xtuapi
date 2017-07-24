const request = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')

const config = require('../config/default')
const header = config.header
const user = config.xtuURL.user

module.exports = (req, res) => {
  const rankURL = user.host + user.path.rank
  // const YEAR = [
  //   '2014-2015-1',
  //   '2014-2015-2',
  //   '2015-2016-1',
  //   '2015-2016-2',
  //   '2016-2017-1'
  // ]
  const prop = ['all', '7', '1']

  const formatYear = (curYear, half) => {
    let nextYear = +curYear+1
    return curYear + '-' + nextYear + '-' + half
  }

  let fullYear = req.body.fullYear || config.defaultYear + '-' + config.defaultHalf
  let year

  if (fullYear.indexOf('&') > -1) {
    fullYear = fullYear.split('&').map(el => formatYear(el.split('-')[0], el.split('-')[1]))
    year = fullYear.reduce((a, b) => a + '&kksj=' + b)
  } else {
    let temp = fullYear.split('-')
    year = fullYear = formatYear(temp[0], temp[1])
  }

  let ep = new eventproxy()
  ep.after('getHtml', prop.length, (htmlArr) => {
    let result = {}
    result.rank = []
    result.time = fullYear
    htmlArr.map((htmlObj) => {
      let { html, propEl } = htmlObj,
          $ = cheerio.load(html),
          obj = {},
          table = []

      if (propEl.length === 1) { obj.prop = propEl === '1' ? '必修' : '选修' }
      else { obj.prop = '综合' }

      $('#dataList tr').find('th').each((i, th) => {
        table[i] = {}
        table[i].title = $(th).text()
      })
      $('#dataList tr').find('td').each((i, td) => {
        table[i].number = $(td).text()
      })
      obj.table = table
      result.rank.push(obj)
    })

    console.log('=== 成功获取排名 ===')
    res.status(200).json(result)
  })

  prop.map((propEl, pid) => {
    request.post(rankURL)
      .set(header)
      .set('Cookie', req.session.xtuUser)
      .send(`kksj=${ year }&kclb=${ propEl = propEl !== 'all' ? propEl : '1&kclb=7' }&zsb=0`)
      .end((err, sres) => {
        if (err) { throw new Error(`获取排名失败 ${err}`) }
        ep.emit('getHtml', { html: sres.text, propEl })
      })
  })
}