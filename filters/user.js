const cheerio = require('cheerio')

const userBlogFilter = ({ html }) => {
  const $ = cheerio.load(html)
  let $td = $('.Nsb_layout_r tr').eq(3).find('td')
  let sex = $td.eq(3).text().indexOf('男') > -1 ? 'boy' : 'girl'
  let name = $td.eq(5).text().trim()

  let id = $('.Nsb_layout_r tr').eq(-4).find('td').eq(3).text().trim().slice(-6)

  return { name, sex, id }
}

const userCourseFilter = ({ time, html }) => {
  const $ = cheerio.load(html)
  const table = {
    time,
    course: []
  }

  $('#dataList').find('tr').each((idx, tr) => {
    let $td = $(tr).find('td')
    let item = {
      name: $td.eq(2).text(),
      score: $td.eq(3).text(),
      credit: $td.eq(4).text(),
      hours: $td.eq(5).text(),
      property: $td.eq(7).text()
    }

    table.course.push(item)
  })

  table.course.shift(0)
  return table
}

const userExamFilter = ({ html }) => {
  const $ = cheerio.load(html)
  let $tr = $('#dataList tr')
  let ret = []

  $tr.each((i, tr) => {
    if (i === 0) return

    let $td = $(tr).find('td')
    const temp = {
      name: $td.eq(2).text(),
      date: $td.eq(3).text().split(' ')[0],
      time: $td.eq(3).text().split(' ')[1],
      place: $td.eq(4).text()
    }

    ret.push(temp)
  })

  return ret
}

const userScheduleFilter = ({ html }) => {
  const $ = cheerio.load(html)
  const $tr = $('#kbtable tr')
  const row = []
  const ret = []

  $tr.each((i, tr) => { row.push(tr) })

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
    throw new Error('获取课程失败')
  }

  return ret
}

const userRankFilter = ({ html, propEl }) => {
  const $ = cheerio.load(html)
  const obj = {}
  const table = []

  propEl.length === 1
    ? (obj.prop = propEl === '1' ? '必修' : '选修')
    : obj.prop = '综合'

  $('#dataList tr').find('th').each((i, th) => {
    table[i] = {}
    table[i].title = $(th).text()
  })
  $('#dataList tr').find('td').each((i, td) => {
    table[i].number = $(td).text()
  })
  obj.table = table

  return obj
}

module.exports = {
  userBlogFilter,
  userCourseFilter,
  userExamFilter,
  userScheduleFilter,
  userRankFilter
}
