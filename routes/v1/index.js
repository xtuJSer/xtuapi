const router = require('express').Router()
const url = require('../../config/default').xtuUrl

module.exports = router.get('/', (req, res) => {
  res.status(200).send(Object.keys(url))
})