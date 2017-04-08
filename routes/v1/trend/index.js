const router = require('express').Router()
const trend = require('../../../config/default').xtuUrl.trend.path

router.get('/trend', (req, res) => {
  res.status(200).send(Object.keys(trend))
})

// 校园动态
router.get('/trend/news', require('./news'))
router.get('/trend/notice', require('./notice'))
router.get('/trend/media', require('./media'))

module.exports = router