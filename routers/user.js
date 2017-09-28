const router = require('koa-router')()

const { url: { path: routes } } = require('../config').user
const { getToken, verifyToken } = require('../utils').token

const getRules = ['info', 'course', 'schedule', 'classroom', 'rank', 'exam']
const postRules = ['course', 'classroom', 'rank']
const notFoundMsg = '您所访问的资源是不存在的 🤔'

const loginController = require('../controllers').login.user
const userController = require('../controllers').user

router.get('/', async (ctx, next) => {
  ctx.body = {
    topic: Object.keys(routes).filter(key => key !== 'verification'),
    api: '/:topic'
  }
})

router.use('/', async (ctx, next) => {
  const token = getToken(ctx)
  const { message, isSuccess, decoded } = await verifyToken('user')(token)

  ctx.url === '/user/login' || ctx.assert(isSuccess, 401, message)
  ctx.state.decoded = decoded

  await next()
})

router.post('/login', async (ctx, next) => {
  let { isSuccess, token, message } = await loginController(ctx.request.body, ctx.state.decoded)

  ctx.assert(isSuccess, 401, message)
  ctx.body = { token }
})

const checkRoute = type => async (ctx) => {
  const {
    params: { topic },
    state: { decoded }
  } = ctx

  ctx.assert(
    type.includes(topic), 404, notFoundMsg
  )
  ctx.body = await userController(ctx, { topic, decoded })
}

router.get('/:topic', async (ctx, next) => {
  await checkRoute(getRules)(ctx)
})

router.post('/:topic', async (ctx, next) => {
  await checkRoute(postRules)(ctx)
})

module.exports = router
