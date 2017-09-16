const Koa = require('koa')
const app = new Koa()

const routers = require('./routers')
app.use(routers.routes())

app.use(async (ctx) => {
  ctx.body = 'Hello v2.0'
})

app.listen(3000)
