import * as request from 'superagent'
require('superagent-charset')(request)

import config from '../config/blog'
import { filterList } from '../filters/blog'
import _h from '../utils/headers'

const { rules } = config
const headers = _h.updateHeaders()

/**
 * 获取信息列表
 * @param {*} ctx
 * @param {*} options
 * @param {*} newest
 */
export const crawlerList = (ctx: any, options: object) => new Promise((resolve, reject) => {
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
        scope,
        html: sres.text
      })

      resolve(ret)
    })
})
