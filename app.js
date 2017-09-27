require('babel-polyfill')

const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')

const { mongo_url } = require('./config')
const routers = require('./routers')

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} ${ms}ms\n`)
})

mongoose.Promise = global.Promise
mongoose.connect(mongo_url, {
  useMongoClient: true
})

app.use(bodyParser())
app.use(routers.routes())

module.exports = app
