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
  // const url = 'http://jwxt.xtu.edu.cn/jsxsd/kscj/cjcx_list?xq='+ year +'-'+ nextYear +'-' + half
  const table = {
    // name: '',
    // user: '',
    time,
    course: [
      // { courseName: '', courseScore: 0, courseCredit: 0, courseTime: 0, courseProperty: '' }
    ]
  }

  request.get(url)
    .set(header)
    .set('Cookie', req.session.xtu)
    .charset('utf8')
    .end((err, sres) => {
      if (err) { throw new Error('获取成绩失败') }

      let $ = cheerio.load(sres.text)
      // console.log(sres.text);
      // let source = $('#Top1_divLoginName').text()
      // table.name = source.slice(0, source.indexOf('('))
      // table.user = source.slice(source.indexOf('(') + 1, source.length - 1)

      $('#dataList').find('tr').each((idx, tr) => {
        var $tr = $(tr)
        var item = {}

        // item['courseTime'] = $($tr.find('td')[1]).text()
        item.courseName = $($tr.find('td')[2]).text()
        item.courseScore = $($tr.find('td')[3]).text()
        item.courseCredit = $($tr.find('td')[4]).text()
        item.courseTotalTime = $($tr.find('td')[5]).text()
        item.courseProperty = $($tr.find('td')[7]).text()

        table.course.push(item)
      })

      table.course.shift(0)
      // console.log(table);
      res.status(200).send(table)
      // res.set('Cookie', header.Cookie).send(table)
    })
}