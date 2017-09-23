const router = require('koa-router')()

const { login: { path: routes } } = require('../config').user

const { getToken, verifyToken } = require('../controllers').token
const loginController = require('../controllers').login

router.get('/', async (ctx, next) => {
  ctx.body = {
    topic: Object.keys(routes).map(key => key).filter(key => key !== 'verification'),
    api: '/:topic'
  }
})

router.use('/', async (ctx, next) => {
  if (ctx.url !== '/user/login') {
    const token = getToken(ctx)
    const { message, isSuccess } = await verifyToken(token)

    ctx.assert(isSuccess, 401, message)
  }
  await next()
})

router.post('/login', async (ctx, next) => {
  let { isSuccess, token, message } = await loginController(ctx.request.body)

  ctx.assert(isSuccess, 401, message)
  ctx.body = { token }
})

router.get('/info', async (ctx, next) => {
  ctx.body = '/info'
})

module.exports = router
