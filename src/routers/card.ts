import * as KoaRouter from 'koa-router'
const router = new KoaRouter()

router.get('/test', async (ctx, next) => {
  ctx.body = 'test'
})

// TODO:
// login

export default router
