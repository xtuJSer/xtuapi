// 引入数据库之后
const { crawlerList } = require('../crawlers').info
let start = null
let prev = null

module.exports = async (ctx, options) => {
  let { url, host, scope, topic, limit, cursor } = options
  const Model = require('../models').info(scope, topic)

  const now = Date.now()
  const cur = `${scope}-${topic}`
  let list = []

  if (prev !== cur || !start || now - start >= 5 * 1000 * 60) {
    prev = cur
    start = now

    const newest = await Model.getNewest('title')

    list = await crawlerList(ctx, { url, host, scope, topic, newest })
    list.length && list.map(async item => { await new Model(item).save() })
  }

  limit = Math.max(
    Math.min(20, limit), 1
  )

  list = await Model.getList({ limit, cursor })
  cursor = await Model.getNextId({
    last: list[list.length - 1]
  })

  return { list, limit, cursor, scope, topic }
}
