const router = require('koa-router')()

const { getToken, verifyToken } = require('../controllers').token
const loginController = require('../controllers').login

router.get('/', async (ctx, next) => {
  ctx.body = 'user'
})

router.post('/login', async (ctx, next) => {
  let {
    username = '',
    password = ''
  } = ctx.request.body

  let {
    isSuccess,
    token = '',
    message = ''
  } = await loginController({ username, password })

  ctx.assert(
    isSuccess, 401, message
  )
  ctx.body = { token }
})

router.get('/info', async (ctx, next) => {
  const token = getToken(ctx)

  ctx.assert(
    verifyToken(token), 401, '登录失败'
  )
  ctx.body = { token }
})

module.exports = router
