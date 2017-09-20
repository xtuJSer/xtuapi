const router = require('koa-router')()
const jwt = require('jsonwebtoken')

const { secret } = require('../config')

router.get('/', async (ctx, next) => {
  ctx.body = 'user'
})

// TODO:
router.post('/login', async (ctx, next) => {
  let { name } = ctx.request.body

  const token = jwt.sign({ name }, secret, {
    expiresIn: '1h'
  })

  ctx.body = {
    token: 'Bearer ' + token,
    name
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
