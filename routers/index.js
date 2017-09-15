const router = require('koa-router')()

const pkg = { name, version, author, description } = require('../package.json')
const routes = ['/trend', '/user', '/library', '/card']

router.get('/', function (req, res) {
  res.status(200).json({
    ...pkg,
    '文档': 'https://github.com/xtuJSer/xtuapi'
  })
})

routes.map(
  routePath => {
    const route = require(`.${routePath}`)

    router.use(routePath, route.routes())
  }
)

// router.get('*', (req, res) => {
//   res.status(404).send('您所访问的资源不存在, 请查阅相关文档')
// })

module.exports = router
