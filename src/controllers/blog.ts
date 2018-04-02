import { Blog } from '../models'
import { crawlerList } from '../crawlers/blog'

import config from '../config/blog'
import msg from '../config/message'

const { scopes } = config
const api = '/:scope/:topic'
const map = new Map(scopes)

const controller = async (ctx, options = {}) => {
  let { url, host, scope, topic, limit, skip } = options
  let list = []
  const { throttle: throttleTime } = config
  const start = {}

  limit = +limit
  skip = +skip

  topic === 'all' && (topic = '')

  // TODO: 类型校验

  const now = Date.now()
  const cur = scope + '-' + topic

  // 节流 爬取数据
  if (topic && (!start[cur] || now - start[cur] >= throttleTime)) {
    start[cur] = now

    const newest = await Blog.getNewestTitle({ scope, topic })

    list = await crawlerList(ctx, { url, host, scope, topic, newest })

    if (list.length) {
      for (let item of list) {
        await new Blog(item).save()
      }
    }
  }

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
      topic: Object.keys(el[1].path)
    }))
  }
}

export const getBlog = async (ctx, next) => {
  const { scope, topic } = ctx.data
  const { limit = 10, skip = 0 } = ctx.query

  let command = {}
  const scopes = scope
    ? scope.split(',')
    : []

  if (scopes.some(el => !map.has(el))) {
    ctx.status = 400
    throw new Error(msg.BAD_REQUEST)
  }

  if (scopes.length) {
    command = Object.assign(command, {
      $or: scopes.map(el => {
        return {
          scope: el
        }
      })
    })
  }

  if (topic && ['news', 'notice', 'lecture'].includes(topic)) {
    command = Object.assign(command, { topic })
  }

  const list = await Blog.find(command, { __v: 0, _id: 0 })
    .sort({ time: -1, id: -1 })
    .limit(limit)
    .skip(skip)
    .exec()

  ctx.body = {
    list
  }
}

export const updateBlog = async (ctx, next) => {
  const { scope, topic } = ctx.params
  const { limit = 10, skip = 0 } = ctx.query

  const route = map.get(scope)

  if (!(map.has(scope) && route.path[topic])) {
    ctx.status = 404
    throw new Error(msg.NOT_FOUND)
  }

  const url = route.host + (topic === 'all' ? '' : route.path[topic])

  ctx.body = await controller(ctx, {
    scope,
    topic,
    url,
    limit,
    skip,
    host: route.host
  })
}

export const getBlogDict = async (ctx, next) => {
  const ret = {}

  scopes.map(el => {
    ret[el[0]] = el[1].name
  })

  ctx.body = ret
}

export const getBlogInfo = async (ctx, next) => {
  const { scope } = ctx.data

  ctx.body = {
    info: map.get(scope).info,
    url: map.get(scope).host
  }
}
