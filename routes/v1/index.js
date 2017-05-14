const router = require('express').Router()
const URL = require('../../config/default').xtuURL

module.exports = router.get('/', (req, res) => {
  res.status(200).send(Object.keys(URL))
})
