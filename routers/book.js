const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'book'
})

module.exports = router
