const router = require('koa-router')()

import controller from '../controllers/blog'
import config from '../config/blog'

const { scopes } = config
const api = '/:scope/:topic'

router.get('/', async (ctx, next) => {
  ctx.body = {
    api,
    ...scopes.map(el => ({
      scope: el[0],
      topic: Object.keys(el[1]).filter(key => key !== 'host')
    }))
  }
})

router.get(api, async (ctx, next) => {
  const { scope, topic } = ctx.params
  const { limit = 10, skip = 0 } = ctx.query

  const map = new Map(scopes)
  const route = map.get(scope)

  ctx.assert(
    map.has(scope) && (route[topic] || topic === 'all'),
    404,
    '您所访问的资源不存在'
  )

  const url = route.host + (topic === 'all' ? '' : route[topic])
  const ret = await controller(ctx, { scope, topic, url, limit, skip, host: route.host })

  ctx.body = ret
})

export default router
