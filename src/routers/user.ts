const router = require('koa-router')()

import config from '../config/user'
import _t from '../utils/token'

const { url: { path: routes } } = config
const { getToken, decodeToken, verifyToken } = _t

/**
 * get、post 的路由
 */
const methodRule = {
  get: ['info', 'course', 'schedule', 'classroom', 'rank', 'exam'],
  post: ['course', 'classroom', 'rank']
}

const notFoundMsg = '资源不存在'

import loginController from '../controllers/login/user'
import userController from '../controllers/user'

/**
 * Get:/user 返回所有的规则
 */
router.get('/', async (ctx, next) => {
  ctx.body = {
    topic: Object.keys(routes).filter(key => key !== 'verification'),
    api: '/:topic'
  }
})

/**
 * 登录校验钩子
 * 检测 token 的有无，以及 token 是否过期，判断是否登录成功
 * 否则返回 401
 */
router.use('/', async (ctx, next) => {
  const token = getToken(ctx)
  const { message, isSuccess, decoded } = await verifyToken('user')(token)

  ctx.url === '/user/login' || ctx.path === '/user/classroom' || ctx.assert(isSuccess, 401, message)
  ctx.state.decoded = decoded

  await next()
})

/**
 * 登录教务系统
 */
router.post('/login', async (ctx, next) => {
  let { isSuccess, token, message } = await loginController(
    ctx.request.body,
    ctx.state.decoded
  )

  ctx.assert(isSuccess, 401, message)
  ctx.body = { token }
})

/**
 * 更新、并获取空教室
 */
router.post('/classroom', async (ctx, next) => {
  try {
    const { isSuccess, message, token } = await loginController(ctx.request.body, {})
    if (!isSuccess) { throw new Error(message) }

    const decoded = decodeToken({ token })

    ctx.body = await userController(ctx, {
      topic: 'classroom',
      decoded
    })
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      message: err.message
    }
  }
})

/**
 * 获取空教室
 * day 0:今天 / 1:明天
 */
router.get('/classroom', async (ctx, next) => {
  ctx.body = await userController(ctx, {
    topic: 'classroom',
    decoded: {}
  })
})

/**
 * 教务系统数据其他数据的获取
 * @param {String} type 数据类型
 */
const checkRoute = type => async (ctx) => {
  const {
    params: { topic },
    state: { decoded }
  } = ctx

  ctx.assert(type.includes(topic), 404, notFoundMsg)
  ctx.body = await userController(ctx, {
    topic,
    decoded
  })
}

;['get', 'post'].map(
  m => router[m]('/:topic', async ctx => {
    await checkRoute(methodRule[m])(ctx)
  })
)

export default router
