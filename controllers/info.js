const { crawlerList } = require('../crawlers').info
const { throttleTime } = require('../config').info
const start = {}

module.exports = async (ctx, options) => {
  let { url, host, scope, topic, limit, cursor } = options
  const Model = require('../models').info(scope, topic)

  const now = Date.now()
  const cur = `${scope}-${topic}`
  let list = []

  if (!start[cur] || now - start[cur] >= throttleTime) {
    start[cur] = now

    const newest = await Model.getNewest('title')

    list = await crawlerList(ctx, { url, host, scope, topic, newest })
    // list.length && await list.map(async item => { await new Model(item).save() })
    if (list.length) {
      for (let item of list) {
        await new Model(item).save()
      }
    }
  }

  limit = Math.max(
    Math.min(20, limit), 1
  )
  list = await Model.getList({ limit, cursor })
  console.log(`返回数据数量：${list.length}`)

  const { length } = list
  cursor = await Model.getNextId({
    last: list[length - 1]
  })

  // url 后续删除
  return { list, length, cursor, scope, topic, url }
}
