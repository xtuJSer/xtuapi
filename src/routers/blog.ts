import * as controller from '../controllers/blog'
import * as KoaRouter from 'koa-router'
const router = new KoaRouter()

// router.get('/', controller.getBlogApi)
router.post('/', controller.getBlog)
router.get('/:scope/:topic', controller.updateBlog)
router.get('/dict', controller.getBlogDict)
router.post('/info', controller.getBlogInfo)

export default router
