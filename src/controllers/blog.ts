import { crawlerList } from '../crawlers/blog'
import config from '../config/blog'
import { Blog } from '../models'

const { throttle: throttleTime } = config

const start = {}

export default async (ctx, options = {}) => {
  let { url, host, scope, topic, limit, skip, flag } = options
  let list = []

  limit = +limit
  skip = +skip

  if (flag === 'single') {
    topic === 'all' && (topic = '')

    // TODO: 类型校验

    const now = Date.now()
    const cur = scope + '-' + topic

    // 节流 爬取数据
    if (topic && (!start[cur] || now - start[cur] >= throttleTime)) {
      start[cur] = now

      const newest = await Blog.getNewestTitle({ scope, topic })

      list = await crawlerList(ctx, { url, host, scope, topic, newest })

      // list.length && await list.map(async item => { await new Blog(item).save() })
      if (list.length) {
        for (let item of list) {
          await new Blog(item).save()
        }
      }
    }
  } else if (flag === 'multiple') {

  }

  limit = Math.max(
    Math.min(20, limit), 1
  )
  list = await Blog.getList({ limit, skip, scope, topic })

  return {
    amount: list.length,
    list,
    scope,
    url
  }
}
