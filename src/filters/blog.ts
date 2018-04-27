import * as cheerio from 'cheerio'

type TIME_TYPE = {
  time: string
}

type HREF_TYPE = {
  host: string,
  href: string
}

type LIST_TYPE = {
  host: string,
  html: string,
  rule: LIST_TYPE_RULE,
  newest: string,
  scope: string,
  topic: string
}

type LIST_TYPE_RULE = {
  el: object,
  parent: string,
  time: string,
  func: LIST_TYPE_RULE_FUNC
}

interface LIST_TYPE_RULE_FUNC {
  (target: object): {
    href: string,
    title?: string,
    time?: string
  }
}

const _filterTime = ({ time }: TIME_TYPE) => {
  return time
    // .replace(/\s/g, '')
    // .replace(/^（\d*次）/, '') // (**次)Date
    // .replace(/^\(([\d-]+)\)$/, (str, $1) => $1) // (Date)
    .replace(/.*(\d{4}).{1}(\d{1,2}).{1}(\d{1,2}).*/mg, (str, $1, $2, $3) => $1 + '-' + $2 + '-' + $3)
}

const _formatTime = ({ time }: TIME_TYPE) => {
  return time
    .replace(/(\d{4})-(\d+)-(\d+)/mg, (str, $1, $2, $3): string => {
      return $1 + '-' + ('0' + $2).slice(-2) + '-' + ('0' + $3).slice(-2)
    })
}

const _filterHref = ({ host, href }: HREF_TYPE) => {
  return /http/.test(href)
    ? href
    : /^\//.test(href)
      ? host + href
      : host + '/' + href
}

export const filterList = ({ host, html, rule, newest, scope, topic }: LIST_TYPE) => {
  const ret: object[] = []
  const $ = cheerio.load(html)

  try {
    $(rule.el).find(rule.parent).each(function (i): any {
      let { href, title, time } = rule.func($(this))

      if (!title) {
        return false
      } else {
        title = title.trim()
        if (title.trim() === newest) {
          return false
        }
      }

      href = _filterHref({ host, href })
      if (!time) {
        time = _filterTime({
          time: $(this).find(rule.time).text()
        })
      }

      if (time) {
        time = _formatTime({ time })
      }

      ret.push({ title, href, time, scope, topic })
    })
  } catch (err) {
    console.log(err.message)
    return false
  }

  return ret.reverse()
}
