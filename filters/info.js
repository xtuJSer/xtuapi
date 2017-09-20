const cheerio = require('cheerio')

const filterList = ({ host, html, rule }) => {
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

    ret.push({ href, title, time })
  })

  return ret
}

module.exports = {
  filterList
}
