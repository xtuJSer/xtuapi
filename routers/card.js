const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'card'
})

// login

module.exports = router
