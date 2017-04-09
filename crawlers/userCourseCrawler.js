const request = require('superagent')
const charset = require('superagent-charset')
charset(request)
const cheerio = require('cheerio')

const header = require('../config/default').header
const user = require('../config/default').xtuUrl.user

module.exports = (req, res) => {
  const year = req.body.year || 2016
  const nextYear = parseInt(year) + 1
  const half = req.body.half || 1
  const time = year + '-' + nextYear + '-' + half

  const url = user.host + user.path.course + time
  const table = {
    time,
    course: []
  }

  request.get(url)
    .set(header)
    .set('Cookie', req.session.xtu)
    .charset('utf8')
    .end((err, sres) => {
      if (err) { throw new Error('获取成绩失败') }

      let $ = cheerio.load(sres.text)
      $('#dataList').find('tr').each((idx, tr) => {
        let $tr = $(tr)
        let item = {}

        // item.courseName = $($tr.find('td')[2]).text()
        item.courseName = $tr.find('td').eq(2).text()
        item.courseScore = $tr.find('td').eq(3).text()
        item.courseCredit = $tr.find('td').eq(4).text()
        item.courseTotalTime = $tr.find('td').eq(5).text()
        item.courseProperty = $tr.find('td').eq(7).text()

        table.course.push(item)
      })

      table.course.shift(0)
      console.log(`获取成绩成功:\n ${table}`)
      res.status(200).send(table)
    })
}