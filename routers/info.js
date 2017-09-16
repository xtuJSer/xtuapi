const router = require('koa-router')()

const { info: { scopes, topics } } = require('../config')
const url = '/:scope/:topic'

router.get('/', async (ctx, next) => {
  ctx.body = {
    url,
    scopes,
    topics
  }
})

router.get(url, async (ctx, next) => {
  let { scope, topic } = ctx.params

  ctx.assert(
    scopes.indexOf(scope) > -1 && topics.indexOf(topic) > -1,
    404,
    '您所访问的资源不存在'
  )

  ctx.body = {
    topic
  }
})

module.exports = router
