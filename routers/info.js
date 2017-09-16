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
  const map = new Map(scopes)

  ctx.assert(
    map.has(scope) && map.get(scope)[topic],
    404,
    '您所访问的资源不存在'
  )

  const route = map.get(scope)
  const ret = await controller({
    scope,
    topic,
    url: route.host + route[topic]
  })

  ctx.body = ret
})

module.exports = router
