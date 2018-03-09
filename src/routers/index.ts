import * as KoaRouter from 'koa-router'
const router = new KoaRouter()

import blog from './blog'
import user from './user'

router.use('/blog', blog.routes(), blog.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

export default router
