const Koa = require('koa')
const app = new Koa()
// const mongoose = require('mongoose')

const routers = require('./routers')

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} ${ms}ms`)
})

app.use(routers.routes())

app.listen(3000)
