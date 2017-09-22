const router = require('koa-router')()

const controller = require('../controllers').info
const { info: { scopes } } = require('../config')
const api = 'info/:scope/:topic'

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
  const { limit = 10, cursor = null } = ctx.query // cursor 用于指定返回数据的起始 _id

  const map = new Map(scopes)
  const route = map.get(scope)

  ctx.assert(map.has(scope) && route[topic], 404, '您所访问的资源不存在')

  const url = route.host + route[topic]
  const ret = await controller(ctx, { scope, topic, url, limit, cursor, host: route.host })

  ctx.body = ret
})

module.exports = router
