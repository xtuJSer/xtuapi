const request = require('superagent')
const charset = require('superagent-charset')
charset(request)
const cheerio = require('cheerio')

const header = require('../config/default').header
const user = require('../config/default').xtuUrl.user

module.exports = (req, res) => {
  // let url = 'http://jwxt.xtu.edu.cn/jsxsd/kscj/cjjd_list'
  const rankUrl = user.host + user.path.rank
  const PROP = ['all', '7', '1']

  const year = req.body.year || '2016-2017-1'
  const nextYear = year + 1
  const half = req.body.half || 1
  const data = year + '-' + nextYear + '-' + half

  const prop = PROP[req.body.prop || 0] // 1:必修 or 2:选修 or all: 综合

  request
    .post(rankUrl)
    .set(header)
    .set('Cookie', req.session.xtu)
    // .send({ kksj: yearEl, kclb: propEl, zsb: 0 })
    .send(`kksj=${ data }&kclb=${ prop = prop !== 'all' ? prop : '1&kclb=7' }&zsb=0`)
    // .charset('utf-8')
    .end((err, sres) => {
      if (err) { throw new Error('获取排名失败') }

      // let $ = cheerio.load(sres.text),
      //     obj = {},
      //     table = []

      // obj.year = data
      // if (prop.length === 1) { obj.prop = prop === '1' ? '必修' : '选修' }
      // else { obj.prop = '综合' }

      // $('#dataList tr').find('th').each((i, th) => {
      //   table[i] = {}
      //   table[i].title = $(th).text()
      // })
      // $('#dataList tr').find('td').each((i, td) => {
      //   table[i].num = $(td).text()
      // })
      // // console.log(table)
      // obj.table = table
      // console.log(obj)
      result.push(obj)
    })

}