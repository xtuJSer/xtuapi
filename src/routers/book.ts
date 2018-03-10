import * as KoaRouter from 'koa-router'
const router = new KoaRouter()

const { url: { path: routes } } = require('../config').book
const { getToken, verifyToken } = require('../utils').token

const loginController = require('../controllers').login.book
// const bookController = require('../controllers').book

router.get('/', async (ctx, next) => {
  ctx.body = {
    topic: Object.keys(routes),
    api: '/:topic'
  }
})

router.use('/', async (ctx, next) => {
  const token = getToken(ctx)
  const { message, isSuccess, decoded } = await verifyToken('book')(token)

  if (ctx.url !== '/book/login') {
    if (!isSuccess) {
      ctx.status = 401
      throw new Error(message)
    }
  }

  ctx.state.decoded = decoded

  await next()
})

/**
 * 图书馆系统登录
 */
router.post('/login', async (ctx, next) => {
  let { isSuccess, token, message } = await loginController(ctx.data, ctx.state.decoded)

  if (!isSuccess) {
    ctx.status = 401
    throw new Error(message)
  }

  ctx.body = { token }
})

/**
 * 已借书籍罗列
 */
router.get('/list', async (ctx, next) => {
  const { decoded } = ctx.state

  ctx.body = decoded.sid
})

export default router
