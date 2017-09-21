const cheerio = require('cheerio')

const filterList = ({ host, html, rule, newest }) => {
  const $ = cheerio.load(html)
  const {
    el,
    parent = 'li',
    prev = null,
    child = 'span'
  } = rule

  let ret = []

  $(el + ' ' + parent).each((i, p) => {
    let { href, title } = prev
      ? $(p).find(prev)[0].attribs
      : p.attribs
    let time = $(p).find(child).text()

    href = /http/.test(href) ? href : host + href

    if (title === newest) { return false }
    ret.push({ href, title, time })
  })

  return ret.reverse()
}

module.exports = {
  filterList
}
