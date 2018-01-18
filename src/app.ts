import * as Koa from 'koa'
import * as mongoose from 'mongoose'
import * as bodyParser from 'koa-bodyparser'

const app = new Koa()

import config from './config'
import routers from './routers'

app.use(async (ctx, next) => {
  const start = Date.now()

  await next()
  const ms = Date.now() - start

  console.log(`${ctx.method} ${ctx.url} ${ms}ms\n`)
})

// mongoose.Promise = global.Promise
mongoose.connect(
  config.mongoURL, {
  useMongoClient: true
})

app.use(bodyParser())
app.use(routers.routes())

export default app
