import * as koaRouter from 'koa-router'
const router = new koaRouter()

import controller from '../controllers/blog'
import config from '../config/blog'
import msg from '../config/message'

const { scopes, dict } = config
const api = '/:scope/:topic'
const map = new Map(scopes)

/**
 * API 指南
 */
router.get('/', async (ctx, next) => {
  ctx.body = {
    api,
    ...scopes.map(el => ({
      scope: el[0],
      topic: Object.keys(el[1]).filter(key => key !== 'host')
    }))
  }
})

/**
 * 全站数据获取
 */
router.post('/', async (ctx, next) => {
  const { scope, topic } = ctx.params
  const { limit = 10, skip = 0 } = ctx.query

  ctx.body = await controller(ctx, {
    flag: 'multiple',
    scope,
    topic,
    limit,
    skip
  })
})

/**
 * 主要用于各个网站的数据抓取、更新
 */
router.get(api, async (ctx, next) => {
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
})

/**
 * 获取数据字典
 */
router.get('/dict', async (ctx, next) => {
  ctx.body = dict
})

export default router
