import * as koaRouter from 'koa-router'
const router = new koaRouter()

router.get('/test', async (ctx, next) => {
  ctx.body = 'test'
})

// TODO:
// login

export default router
