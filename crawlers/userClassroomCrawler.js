const request = require('superagent')
const charset = require('superagent-charset')
charset(request)
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const { checkList, judgeDay, getNameAndRoom, formatByTime, formatByName } = require('../filters/userClassroom')

const header = require('../config/default').header
const user = require('../config/default').xtuUrl.user
const classroomDataDir = path.join(__dirname, '../store')

const init = html => {
  let $ = cheerio.load(html)
  let table = []

  $('#dataList').find('tr').each((idx, tr) => {
    if (idx <= 1) return
    let $tr = $(tr),
        item = {},
        tdArr = $tr.find('td')

    item.classroomName = $(tdArr[0]).text().trim()
    item.classroomTime = []

    for (let i = 1; i < 6; i ++) {
      item.classroomTime.push($(tdArr[i]).text().trim())
    }
    table.push(item)
  })
  return table
}

module.exports = (req, res, session) => {
  let day = req.body.day || 0
  ;(day < 0 || day > 1) && (day = 0)
  const classroomUrl = user.host + user.path.classroom

  request.post(classroomUrl)
    .send({ xzlx: day })
    .set(header)
    .set('Cookie', session)
    .charset('utf-8')
    .end((err, sres) => {
      if (err) { throw new Error('获取空闲教室失败') }

      let table = init(sres.text)

      table = +req.body.byName === 1
        ? formatByName(table)
        : formatByTime(table)

      console.log(`=== 成功获取空闲教室 ===`)

      fs.writeFileSync(classroomDataDir + '/classroom_' + judgeDay(day) + '.json', JSON.stringify(table, null, 2))
      res.status(200).json(table)
    })
}
