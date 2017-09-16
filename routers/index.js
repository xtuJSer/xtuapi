const router = require('koa-router')()

const { name, description, version, author } = require('../package.json')
const routes = ['/info', '/user', '/book', '/card']

router.get('/', (ctx) => {
  ctx.body = {
    name,
    description,
    version,
    author,
    api: 'https://github.com/xtuJSer/xtuapi'
  }
})

routes.map(
  routePath => {
    const route = require(`.${routePath}`)

    router.use(routePath, route.routes(), route.allowedMethods())
  }
)

router.get('*', (ctx) => {
  ctx.status = 404
  ctx.body = '您所访问的资源不存在, 请查阅相关文档'
})

module.exports = router
