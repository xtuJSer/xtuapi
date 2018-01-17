import * as request from 'superagent'
require('superagent-charset')(request)

const { rules } = require('../config/blog')
const { filterList } = require('../filters/blog')
const { headers: { updateHeaders } } = require('../utils')

const headers = updateHeaders()

/**
 * 获取信息详情
 * @param {*} ctx
 * @param {*} options
 */
const crawlerItem = async (ctx: object, options: object) => {
  // const $ = cheerio.load()
}

/**
 * 获取信息列表
 * @param {*} ctx
 * @param {*} options
 * @param {*} newest
 */
const crawlerList = (ctx: object, options: object) => new Promise((resolve, reject) => {
  const { host, url, scope, topic, newest = '' } = options
  const rule = rules[scope][topic] || rules[scope].default || {}

  request
    .get(url)
    .set(headers)
    .charset(rule.charset || 'utf-8')
    .end((err, sres) => {

      if (err || !sres) {
        ctx.status = 500
        throw new Error(err)
      }

      let ret = filterList({
        host,
        rule,
        newest,
        topic,
        html: sres.text
      })

      resolve(ret)
    })
})

export default {
  crawlerItem,
  crawlerList
}
