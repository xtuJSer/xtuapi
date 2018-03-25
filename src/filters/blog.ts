import * as cheerio from 'cheerio'

const _filterTitle = ({ title, parent }) => {
  if (!parent || title) { return title.trim() }

  return parent.trim()
}

export const filterTime = (time) => {
  return time
    .replace(/\s/g, '')
    .replace(/^（\d*次）/, '') // (**次)Date
    .replace(/^\(([\d-]+)\)$/, (str, $1) => $1) // (Date)
    // .replace(/^.*(\d{4})年(\d+)月(\d+)日.*$/g, (str, $1, $2, $3) => $1 + '-' + $2 + '-' + $3) // (年月日)
    .replace(/.*(\d{4}).{1}(\d+).{1}(\d+).*/mg, (str, $1, $2, $3) => $1 + '-' + $2 + '-' + $3)
}

const _filterHref = ({ host, href }) => {
  return /http/.test(href)
    ? href
    : /^\//.test(href)
      ? host + href
      : host + '/' + href
}

export const filterList = ({ host, html, rule, newest, scope, topic }) => {
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

      title = _filterTitle({
        title: (!title && prev) ? $prev.children[0].data : title,
        parent: p.children[1].data ||
          (specialTitle && $(p).find(specialTitle)[0].children[0].data)
      })

      if (title === newest) {
        return false
      }

      href = _filterHref({ host, href })
      let time = filterTime(
        $(p).find(child).text()
      )

      title && ret.push({ title, href, time, scope, topic })
    } catch (err) {
      console.log(err)
      return false
    }
  })

  return ret.reverse()
}
