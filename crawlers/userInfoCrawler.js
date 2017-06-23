const request = require('superagent'),
      cheerio = require('cheerio'),
      eventproxy = require('eventproxy')

const header = require('../config/default').header,
      user = require('../config/default').xtuURL.user,
      URL = user.host + user.path.info

module.exports = (req, res) => {
  request
    .get(URL)
    .set(header)
    .set('Cookie', req.session.xtuUser)
    .charset('utf-8')
    .end((err, sres) => {
      if (err) { throw new Error('获取信息失败') }
      let $ = cheerio.load(sres.text)
      let $td = $('.Nsb_layout_r tr').eq(3).find('td')
      sex = $td.eq(3).text()
      name = $td.eq(5).text()
      res.status(200).json({ name, sex })
    })
}