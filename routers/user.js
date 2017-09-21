const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { Strategy } = require('passport-http-bearer')

const { secret } = require('../config')
// const {  } = require('../models').user

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

router.get('/info', async (ctx, next) => {
  let { token } = ctx.request.body

  let ret = new Strategy(async (token, done) => {
    await User.findOne(
      { token },
      (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      })
  })

  passport.use(ret)
})

// "verification",
// "course",
// "klass",
// "classroom",
// "rank",
// "info",
// "exam"

module.exports = router
