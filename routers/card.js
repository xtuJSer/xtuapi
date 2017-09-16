const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'card'
})

module.exports = router
