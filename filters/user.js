const cheerio = require('cheerio')

const userInfoFilter = ({ html }) => {
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

module.exports = {
  userInfoFilter,
  userCourseFilter,
  userExamFilter
}
