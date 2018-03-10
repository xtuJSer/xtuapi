import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as commonMiddlewares from './middlewares/common'
import * as blogMiddlewares from './middlewares/blog'

import routers from './routers'

const app = new Koa()

app.use(bodyParser())
app.use(commonMiddlewares.request)
app.use(commonMiddlewares.log)
app.use(commonMiddlewares.handleError)
app.use(blogMiddlewares.format)
app.use(routers.routes())

export default app
