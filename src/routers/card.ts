const router = require('koa-router')()

router.get('/test', async (ctx, next) => {
  ctx.body = 'test'
})

// TODO:
// login

export default router
