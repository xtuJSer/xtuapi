const request = require('superagent')
const charset = require('superagent-charset')
charset(request)
const cheerio = require('cheerio')

const config = require('../config/default')
const header = config.header
const user = config.xtuURL.user

module.exports = (req, res) => {
  const year = req.body.year || config.defaultYear
  const nextYear = parseInt(year) + 1
  const half = req.body.half || config.defaultHalf
  const time = year + '-' + nextYear + '-' + half

  const URL = user.host + user.path.course + time
  const table = {
    time,
    course: []
  }

  request.get(URL)
    .set(header)
    .set('Cookie', req.session.xtuUser)
    .charset('utf8')
    .end((err, sres) => {
      if (err) { throw new Error('获取成绩失败') }

      let $ = cheerio.load(sres.text)
      $('#dataList').find('tr').each((idx, tr) => {
        let $td = $(tr).find('td'),
          item = {}

        item.name = $td.eq(2).text()
        item.score = $td.eq(3).text()
        item.credit = $td.eq(4).text()
        item.time = $td.eq(5).text()
        item.property = $td.eq(7).text()

        table.course.push(item)
      })

      table.course.shift(0)
      console.log('=== 成功获取成绩 ===')
      res.status(200).send(table)
    })
}
