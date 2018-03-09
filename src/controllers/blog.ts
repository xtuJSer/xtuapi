import { crawlerList } from '../crawlers/blog'
import config from '../config/blog'
import { Blog } from '../models'

import msg from '../config/message'

const { scopes, dict } = config
const api = '/:scope/:topic'
const map = new Map(scopes)

const { throttle: throttleTime } = config

const start = {}

const controller = async (ctx, options = {}) => {
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


export const getBlogApi = async (ctx, next) => {
  ctx.body = {
    api,
    ...scopes.map(el => ({
      scope: el[0],
      topic: Object.keys(el[1]).filter(key => key !== 'host')
    }))
  }
}

export const getBlog = async (ctx, next) => {
  const { scope, topic } = ctx.params
  const { limit = 10, skip = 0 } = ctx.query

  ctx.body = await controller(ctx, {
    flag: 'multiple',
    scope,
    topic,
    limit,
    skip
  })
}

export const updateBlog = async (ctx, next) => {
  const { scope, topic } = ctx.params
  const { limit = 10, skip = 0 } = ctx.query

  const route = map.get(scope)

  ctx.assert(
    map.has(scope) && (route[topic] || topic === 'all'),
    404,
    msg.NOT_FOUND
  )

  const url = route.host + (topic === 'all' ? '' : route[topic])

  ctx.body = await controller(ctx, {
    flag: 'single',
    scope,
    topic,
    url,
    limit,
    skip,
    host: route.host
  })
}

export const getBlogDict = async (ctx, next) => {
  ctx.body = dict
}
