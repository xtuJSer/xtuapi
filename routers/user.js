const router = require('koa-router')()
const jwt = require('jsonwebtoken')

const { secret } = require('../config')

router.get('/', async (ctx, next) => {
  ctx.body = 'user'
})

// TODO:
router.post('/login', async (ctx, next) => {
  let { username } = ctx.request.body

  const token = jwt.sign({ username }, secret, {
    expiresIn: '1h'
  })

  ctx.body = {
    token: 'Bearer ' + token,
    username
  }
})

// "verification",
// "course",
// "klass",
// "classroom",
// "rank",
// "info",
// "exam"

module.exports = router
