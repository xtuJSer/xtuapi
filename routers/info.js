const router = require('koa-router')()

const controller = require('../controllers/info')
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
  const { scope, topic } = ctx.params
  // TODO: 按需加载，以下 _id 是占位符，未来根据 scope 和 topic 查找数据库，用于返回最新数据的 _id
  const { limit = 10, cursor = '_id' } = ctx.query
  const map = new Map(scopes)
  const route = map.get(scope)

  ctx.assert(
    map.has(scope) && route[topic],
    404,
    '您所访问的资源不存在'
  )

  const url = route.host + route[topic]
  const ret = await controller({ scope, topic, url, limit, cursor })

  ctx.body = ret
})

module.exports = router
