const cheerio = require('cheerio')

const filterTitle = ({ title, parent }) => {
  if (!parent || title) { return title }

  return parent.trim()
}

const filterTime = (time) => {
  return time
    .replace(/^（\d*次）/, '') // (**次)Date
    .replace(/^\(([\d-]+)\)$/, (str, $1) => $1) // (Date)
    .replace(/^.*(\d{4})年(\d+)月(\d+)日.*$/g, (str, $1, $2, $3) => $1 + '-' + $2 + '-' + $3) // (年月日)
}

const filterHref = ({ host, href }) => {
  return /http/.test(href)
    ? href
    : host + href
}

const filterList = ({ host, html, rule, newest, topic }) => {
  const $ = cheerio.load(html)
  const {
    el,
    parent = 'li',
    prev = null,
    child = 'span',
    specialTitle = null
  } = rule

  let ret = []

  $(el + ' ' + parent).each((i, p) => {
    let { href, title } = prev
      ? $(p).find(prev)[0].attribs
      : p.attribs

    title = filterTitle({
      title,
      parent: p.children[1].data ||
        (specialTitle && $(p).find(specialTitle)[0].children[0].data)
    })

    if (title === newest) { return false }

    href = filterHref({ host, href })
    let time = filterTime(
      $(p).find(child).text()
    )

    ret.push({ title, href, time, topic })
  })

  return ret.reverse()
}

module.exports = {
  filterList,
  filterTime
}