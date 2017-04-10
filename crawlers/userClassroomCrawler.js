const request = require('superagent')
const charset = require('superagent-charset')
charset(request)
const cheerio = require('cheerio')

const header = require('../config/default').header
const user = require('../config/default').xtuUrl.user

module.exports = (req, res) => {
  // const classroomUrl = 'http://jwxt.xtu.edu.cn/jsxsd/kbxx/kxjs_query'
  const classroomUrl = user.host + user.path.classroom

  request.get(classroomUrl)
    .set(header)
    .set('Cookie', req.session.xtu)
    .charset('utf-8')
    .end((err, sres) => {
      // fs.writeFile('output.html', sres.text)
      let $ = cheerio.load(sres.text)
      let table = []

      $('#dataList').find('tr').each((idx, tr) => {
        if (idx <= 1) return
        let $tr = $(tr)
        let item = {}
        item.classroomName = ''
        item.classroomTime = []

        let tdArr = $tr.find('td')
        item.classroomName = $(tdArr[0]).text().trim()

        for (let i = 1; i < 6; i ++) {
          item.classroomTime.push($(tdArr[i]).text().trim())
        }

        table.push(item)
      })
      // console.log(table);

      let data = table
      let Time = []

      data.map((el, idx) => {
        let name = el.classroomName
        let time = el.classroomTime

        time.map((t, i) => {
          if (t === '空') {
            Time[i] || (Time[i] = [])
            let curTime = Time[i]

            let { curIdx, nextName } = (function (name, curTime) {
              let curName = name
              let nextName = name
              // let curIdx = -1
              if (/\-/g.test(name)) {
                curName = name.split('-')[0]
                nextName = name.split('-')[1]
              } else if (name.search(/\w/g) !== -1){
                curName = name.slice(0, name.search(/\w/g))
                nextName = name.slice(name.search(/\w/g))
              }

              for (let i = 0, len = curTime.length; i < len; i ++) {
                if (curTime[i].name.indexOf(curName) === 0) {
                  return {
                    nextName,
                    curIdx: i
                  }
                }
              }

              curTime.push({ name: curName, room: [] })
              return {
                nextName,
                curIdx: curTime.length - 1
              }
            })(name, curTime)

            curTime[curIdx].room = [...curTime[curIdx].room, nextName]
          }
        })
      })

       // fs.writeFile('classroom.json', JSON.stringify(Time, null, 2))
      res.status(200).send(Time)
    })
}