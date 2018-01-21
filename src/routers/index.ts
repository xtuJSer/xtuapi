const router = require('koa-router')()

// const { name, description, version, author } = require('../package.json')
const routes = ['blog', 'user', 'book', 'card']
const api = 'https://github.com/xtuJSer/xtuapi'

// router.get('/', async (ctx: object) => {
//   ctx.body = {
//     name,
//     description,
//     version,
//     author,
//     path: routes,
//     document: api
//   }
// })

// routes.map(routePath => {
//   const route = require(`./${routePath}`)

//   router.use(
//     `/${routePath}`,
//     route.routes(),
//     route.allowedMethods()
//   )
// })

import blog from './blog'
import user from './user'

router.use(
  '/blog',
  blog.routes(),
  blog.allowedMethods()
)

router.use(
  '/user',
  user.routes(),
  user.allowedMethods()
)

export default router
