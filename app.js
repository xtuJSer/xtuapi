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
  name: config.session.key,
  secret: config.session.secret,
  resave: config.session.resave,
  saveUninitialized: config.session.saveUninitialized,
  cookie: {
    maxAge: config.session.maxAge
  }

  // store: new MongoStore({
  //   url: config.mongodb
  // })
}))
app.use(compress())

routes(app)

const port = process.env.PORT || config.port
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`)
})
