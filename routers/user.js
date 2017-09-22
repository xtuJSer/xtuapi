const router = require('koa-router')()

const { getToken, createToken, verifyToken } = require('../controllers').token
// const {  } = require('../models').user

router.get('/', async (ctx, next) => {
  ctx.body = 'user'
})

router.post('/login', async (ctx, next) => {
  let { username } = ctx.request.body

  // TODO: 模拟登陆
  const token = createToken(username)

  ctx.body = {
    token: 'Bearer ' + token,
    username
  }
})

router.get('/info', async (ctx, next) => {
  const token = getToken(ctx)

  ctx.assert(verifyToken(token), 401, '登录失败')
  ctx.body = { token }
})

// "verification",
// "course",
// "klass" -> "schedule",
// "classroom",
// "rank",
// "info",
// "exam"

module.exports = router
