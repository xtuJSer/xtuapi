import * as KoaRouter from 'koa-router'
const router = new KoaRouter()

import user from './user'
import blog from './blog'

router.use('/user', user.routes(), user.allowedMethods())
router.use('/blog', blog.routes(), blog.allowedMethods())

export default router
