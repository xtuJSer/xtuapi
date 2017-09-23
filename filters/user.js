const cheerio = require('cheerio')

const userInfoFilter = ({ html }) => {
  let $ = cheerio.load(html)
  let $td = $('.Nsb_layout_r tr').eq(3).find('td')
  let sex = $td.eq(3).text().indexOf('男') > -1 ? 'boy' : 'girl'
  let name = $td.eq(5).text().trim()

  let id = $('.Nsb_layout_r tr').eq(-4).find('td').eq(3).text().trim().slice(-6)

  return { name, sex, id }
}

module.exports = {
  userInfoFilter
}
