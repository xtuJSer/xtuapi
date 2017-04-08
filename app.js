const path = require('path')
const pkg = require('package.json')
const express = require('express')
const app = express()
const router = require('./routes')(app)

const port = process.env.PORT || config.port
app.listen(port, () => {
  console.log(`Server is listening at port  + ${port}  + ...`)
})
