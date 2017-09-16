const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'book'
})

// TODO:
// "login",
// "book"

module.exports = router
