const { crawlerList } = require('../crawlers').blog
const { throttleTime } = require('../config').blog
const start = {}

module.exports = async (ctx, options) => {
  let { url, host, scope, topic, limit, skip } = options
  topic === 'all' && (topic = '')
  // TODO: 类型校验
  limit = +limit
  skip = +skip

  const Model = require('../models').blog(scope)

  const now = Date.now()
  const cur = scope + '-' + topic
  let list = []

  // 节流 爬取数据
  if (topic && (!start[cur] || now - start[cur] >= throttleTime)) {
    start[cur] = now

    const newest = await Model.getNewestTitle({ topic })

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
  list = await Model.getList({ limit, skip, topic })

  // url 后续删除
  return { list, length: list.length, scope, url }
}
