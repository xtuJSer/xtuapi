const router = require('koa-router')()

const { info: { scopes } } = require('../config')
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
  let { scope, topic } = ctx.params
  const map = new Map(scopes)

  ctx.assert(
    map.has(scope) && map.get(scope)[topic],
    404,
    '您所访问的资源不存在'
  )

  scope = map.get(scope)
  ctx.body = {
    topic,
    url: scope.host + scope[topic]
  }
})

module.exports = router
