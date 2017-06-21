const request = require('superagent')
const cheerio = require('cheerio')
require('superagent-charset')(request)

const library = require('../../config/default').xtuURL.library,
      header = require('../../config/default').header,
      URL = library.host + library.path.book

module.exports = (req, res) => {
  const cookie = req.session.xtuLibrary
  // const cookie = 'JSESSIONID=C298AB8BF19C61EACBD4A6E4652D799B; ASP.NET_SessionId=mfpy121l2ixqtq1wdbyrw1us'
  let ret = []

  request
    .get(URL)
    .set('Cookie', cookie)
    .set(header)
    .charset('gbk')
    .end((err, sres) => {
      if (err) { throw new Error('获取数据失败') }
      let $ = cheerio.load(sres.text)
      let tr = $('table').find('tr')

      for (let el = 1, len = tr.length; el < len; el++) {
        let $td = $(tr[el]).find('td')
        let temp = {}
        temp.name = $td.eq(2).text().trim(),
        temp.number = $td.eq(3).text().trim(),
        temp.date = $td.eq(6).text().trim()
        ret.push(temp)
      }

      res.status(200).send(ret)
    })
}

// 请注意续借天数是从续借当天开始计算，而不是从图书到期日期开始计算。确实要续借吗