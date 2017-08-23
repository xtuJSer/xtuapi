const path = require('path')
const pkg = require('./package.json')
const config = require('./config/default')
const routes = require('./routes')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const compress = require('compression')
// const MongoStore = require('connect-mongo')(session)

const express = require('express')
const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(bodyParser.json({ limit: '1mb' }))
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: config.session.resave,
  saveUninitialized: config.session.saveUninitialized,
  secure: config.session.secure,
  cookie: {
    maxAge: config.session.cookie.maxAge,
    httpOnly: config.session.cookie.httpOnly
  }
  // store: new MongoStore({
  //   url: config.db
  // })
}))
app.use(compress())

app.all('*', (req, res, next) => {
  for (let el of config.cors.origin) {
    if (el === req.headers.origin) {
      res.header("Access-Control-Allow-Origin", req.headers.origin)
      break
    }
  }
  res.header("Access-Control-Allow-Headers", config.cors.headers)
  res.header("Access-Control-Allow-Credentials", config.cors.credentials)
  res.header("Access-Control-Allow-Methods", config.cors.methods)
  res.header("Access-Control-Max-Age", config.cors.maxAge);
  res.header("Content-Type", config.cors.contentType)

  next()
})

routes(app)

const port = process.env.PORT || config.port
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`)
})
