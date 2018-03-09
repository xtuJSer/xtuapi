import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as mongoose from 'mongoose'
import * as middlewares from './middlewares/common'

const app = new Koa()

import config from './config'
import routers from './routers'

mongoose.Promise = global.Promise
mongoose.connect(
  config.mongoURL, {
  useMongoClient: true
})

app.use(middlewares.log)
app.use(bodyParser())
app.use(routers.routes())

export default app
