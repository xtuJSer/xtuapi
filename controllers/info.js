// 引入数据库之后
const { crawlerList } = require('../crawlers').info
let start = null

module.exports = async (ctx, options) => {
  const { url, host, scope, topic, limit, cursor } = options
  const Model = require('../models').info(scope, topic)
  const now = Date.now()
  let list = []

  if (!start || now - start >= 5 * 1000 * 60) {
    start = now

    const newest = await Model.getNewest('title')
    console.log(newest)

    list = await crawlerList(ctx, { url, host, scope, topic, newest })
    list.length && list.map(async item => { await new Model(item).save() })
  }

  return { list, limit, cursor, url }
}
