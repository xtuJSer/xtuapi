const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'info'
})

// router
//   .get('/news')
//   .get('/lecture')
//   .get('/notice')
//   .get('/media')

module.exports = router
