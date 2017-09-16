const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'user'
})

// "login",
// "verification",
// "course",
// "klass",
// "classroom",
// "rank",
// "info",
// "exam"

module.exports = router
