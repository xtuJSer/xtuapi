const router = require('koa-router')()

const { name, description, version, author } = require('../package.json')
const routes = ['blog', 'user', 'book', 'card']
const api = 'https://github.com/xtuJSer/xtuapi'

router.get('/', async (ctx) => {
  ctx.body = { name, description, version, author, path: routes, document: api }
})

routes.map(
  routePath => {
    const route = require(`./${routePath}`)

    router.use(`/${routePath}`, route.routes(), route.allowedMethods())
  }
)

module.exports = router
