import * as controller from '../controllers/blog'
import * as KoaRouter from 'koa-router'
const router = new KoaRouter()

router
  .get('/', controller.getBlogApi)
  .post('/', controller.getBlog)
  .get('/:scope/:topic', controller.updateBlog)
  .get('/dict', controller.getBlogDict)

export default router
