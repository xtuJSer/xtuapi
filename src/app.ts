import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as middlewares from './middlewares/common'

import routers from './routers'

const app = new Koa()

app.use(middlewares.log)
app.use(bodyParser())
app.use(routers.routes())

export default app
