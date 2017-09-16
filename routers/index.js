const router = require('koa-router')()

const { name, description, version, author } = require('../package.json')
const routes = ['info', 'user', 'book', 'card']
const api = 'https://github.com/xtuJSer/xtuapi'

router.get('/', (ctx) => {
  ctx.body = {
    name,
    description,
    version,
    author,
    api
  }
})

routes.map(
  routePath => {
    const route = require(`./${routePath}`)

    router.use(`/${routePath}`, route.routes(), route.allowedMethods())
  }
)

router.get('*', (ctx) => {
  ctx.status = 404
  ctx.body = {
    msg: '您所访问的资源不存在, 请查阅相关文档',
    api
  }
})

module.exports = router
