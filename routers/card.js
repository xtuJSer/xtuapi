const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'card'
})

// TODO:
// login

module.exports = router
