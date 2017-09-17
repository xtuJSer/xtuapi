const router = require('koa-router')()

const controller = require('../controllers/info')
const { info: { scopes } } = require('../config')
const api = '/:scope/:topic'

router.get('/', async (ctx) => {
  ctx.body = {
    api,
    ...scopes.map(el => ({
      scope: el[0],
      topic: Object.keys(el[1]).filter(key => key !== 'host')
    }))
  }
})

router.get(api, async (ctx) => {
  const { scope, topic } = ctx.params
  // TODO: 按需加载
  const { limit = 10, cursor = '_id' } = ctx.query
  const map = new Map(scopes)

  ctx.assert(
    map.has(scope) && map.get(scope)[topic],
    404,
    '您所访问的资源不存在'
  )

  const route = map.get(scope)
  const url = route.host + route[topic]
  const ret = await controller({ scope, topic, url, limit, cursor })

  ctx.body = ret
})

module.exports = router
