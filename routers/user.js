const router = require('koa-router')()
const request = require('superagent')

const { url: { path: routes } } = require('../config').user
const { getToken, verifyToken } = require('../utils').token

const getRules = ['blog', 'course', 'schedule', 'classroom', 'rank', 'exam']
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

  ctx.url === '/user/login' || ctx.url === '/user/classroom' || ctx.assert(isSuccess, 401, message)
  ctx.state.decoded = decoded

  await next()
})

router.post('/login', async (ctx, next) => {
  let { isSuccess, token, message } = await loginController(ctx.request.body, ctx.state.decoded)

  ctx.assert(isSuccess, 401, message)
  ctx.body = { token }
})

// 获取空教室
router.get('/classroom', async (ctx, next) => {
  const { day = 0 } = ctx.query // 0:今天 or 1:明天

  try {

    ctx.assert(isSuccess, 404, message)



  } catch (err) {
    ctx.status = 500
    ctx.body = { msg: '获取数据失败' }
  }
})

// 更新空教室
router.post('/classroom', async (ctx, next) => {
  // 此处需要自定义，返回对象 { username: *****, password: ****** }，* 处由自己填充，且都为 String 类型
  const mine = require('../config/classroom')

  let ret = await new Promise((resolve, reject) => {
    request
      .post('http://127.0.0.1:3000/user/login')
      .send(mine)
      .end((err, data) => {
        if (err) { reject(err) }

        console.log(data.body)
        resolve(data.body)
      })
  })

  ctx.body = ret
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
