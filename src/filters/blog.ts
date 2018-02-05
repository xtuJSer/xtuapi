import * as cheerio from 'cheerio'

const filterTitle = ({ title, parent }) => {
  if (!parent || title) { return title.trim() }

  return parent.trim()
}

const filterTime = (time) => {
  return time
    .replace(/\s/g, '')
    .replace(/^（\d*次）/, '') // (**次)Date
    .replace(/^\(([\d-]+)\)$/, (str, $1) => $1) // (Date)
    // .replace(/^.*(\d{4})年(\d+)月(\d+)日.*$/g, (str, $1, $2, $3) => $1 + '-' + $2 + '-' + $3) // (年月日)
    .replace(/.*(\d{4}).{1}(\d+).{1}(\d+).*/mg, (str, $1, $2, $3) => $1 + '-' + $2 + '-' + $3)
}

const filterHref = ({ host, href }) => {
  return /http/.test(href)
    ? href
    : /^\//.test(href)
      ? host + href
      : host + '/' + href
}

const filterList = ({ host, html, rule, newest, topic }) => {
  const ret = []
  const $ = cheerio.load(html)
  const {
    el,
    parent = 'li',
    prev = null,
    child = 'span',
    specialTitle = null
  } = rule

  $(el + ' ' + parent).each((i, p) => {
    try {
      const $prev = $(p).find(prev)[0] || {}

      let { href, title } = prev
        ? $prev.attribs
        : p.attribs

      title = filterTitle({
        title: (!title && prev) ? $prev.children[0].data : title,
        parent: p.children[1].data ||
          (specialTitle && $(p).find(specialTitle)[0].children[0].data)
      })

      if (title === newest) { return false }

      href = filterHref({ host, href })
      let time = filterTime(
        $(p).find(child).text()
      )

      title && ret.push({ title, href, time, topic })
    } catch (err) {
      console.log(err)
      return false
    }
  })

  return ret.reverse()
}

export default {
  filterList,
  filterTime
}