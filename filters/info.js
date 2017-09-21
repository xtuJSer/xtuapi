const cheerio = require('cheerio')

const filterTitle = ({ title, parent }) => {
  if (!parent || title) { return title }

  return parent.trim()
}

const filterTime = (time) => {
  return time
    .replace(/^（\d*次）/, '') // (**次)Date
    .replace(/\(([\d-]+)\)/, (str, $1) => $1) // (Date)
}

const filterHref = ({ host, href }) => {
  return /http/.test(href)
    ? href
    : host + href
}

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

    if (title === newest) { return false }

    ret.push({
      title: filterTitle({
        title,
        parent: p.children[1].data
      }),
      href: filterHref({
        host,
        href
      }),
      time: filterTime(
        $(p).find(child).text()
      )
    })
  })

  return ret.reverse()
}

module.exports = {
  filterList,
  filterTime
}
