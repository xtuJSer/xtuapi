const path = require('path')
const pkg = require('./package.json')
const config = require('./config/default')
const routes = require('./routes')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const compress = require('compression')

const express = require('express')
const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(bodyParser.json({ limit: '1mb' }))
app.use(session({ ...config.session }))
app.use(compress())

app.all('*', (req, res, next) => {
  const { headers, credentials, methods, maxAge, contentType } = config.cors

  res.header('Access-Control-Allow-Origin', req.headers.host)
  res.header('Access-Control-Allow-Headers', headers)
  res.header('Access-Control-Allow-Credentials', credentials)
  res.header('Access-Control-Allow-Methods', methods)
  res.header('Access-Control-Max-Age', maxAge)
  res.header('Content-Type', contentType)

  next()
})

routes(app)

module.exports = app

const port = process.env.PORT || config.port
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`)
})
