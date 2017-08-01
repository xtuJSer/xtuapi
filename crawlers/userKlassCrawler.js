const request = require('superagent'),
      cheerio = require('cheerio'),
      config = require('../config/default'),
      header = config.header,
      user = config.xtuURL.user

require('superagent-charset')(request)

module.exports = (req, res) => {
  const year = config.defaultYear,
        half = config.defaultHalf,
        data = `cj0701id=&zc=&demo=&xnxq01id=${year}-${year + 1}-${half}&sfFD=1`,
        klassURL = user.host + user.path.klass

  request.post(klassURL)
    .set(header)
    .set('Cookie', req.session.xtuUser)
    .send(data)
    .end((err, sres) => {
      // if (err) { throw new Error(`获取课程失败: ${err}`) }
      if (err) {
        res.status(500).send('暂无数据')
        throw new Error(`获取课程失败: ${err}`)
      }

      ;(function () {
        let $ = cheerio.load(sres.text),
            $tr = $('#kbtable tr'), // 获取所有 tr
            row = [],
            ret = []

        // 将每一行都存入 row
        $tr.each((i, tr) => {
          row.push(tr)
        })
        // 首位都不是需要的，除去
        row.shift()
        row.pop()

        row.map((tr, i) => {
          ret[i] = []
          $(tr).find('td').each((j, td) => {
            let $klass = $(td).find('.kbcontent1')
            let name = $klass.text().split(/\d/)[0].trim()

            let details = []
            let $detail = $(td).find('.kbcontent1 font')
            let time = $detail.eq(0).text().split('(')[0]
            let place = $detail.eq(1).text()
            details.push({ time, place })

            // 存在两个时间地点
            if ($klass.text().indexOf('----') !== -1) {
              time = $detail.eq(2).text().split('(')[0]
              place = $detail.eq(3).text()
              details.push({ time, place })
            }

            ret[i][j] = name ? { name, details } : null
          })
        })

        if (ret.length === 0) {
          res.status(500).send('获取课程失败')
        }
        // fs.writeFileSync('output_' + Date.now() + '.json', JSON.stringify(ret, null, 2))
        console.log('=== 成功获取课程表 ===')
        res.status(200).json(ret)
      })()
    })
}