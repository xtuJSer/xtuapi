const Koa = require('koa')
const app = new Koa()

const routers = require('./routers')
app.use(routers.routes())

app.use(async (ctx) => {
  ctx.body = 'Hello v2.0'
})

<<<<<<< HEAD
routes(app)

module.exports = app

const port = process.env.PORT || config.port
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`)
})
=======
app.listen(3000)
>>>>>>> dev
