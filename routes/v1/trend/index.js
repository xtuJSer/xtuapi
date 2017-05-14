const router = require('express').Router()
const trend = require('../../../config/default').xtuURL.trend.path

router.get('/trend', (req, res) => {
  res.status(200).send(Object.keys(trend))
})

// 校内新闻
router.get('/trend/news', require('./news'))
router.get('/trend/news/:count', require('./news'))

// 通知公告
router.get('/trend/notice', require('./notice'))
router.get('/trend/notice/:count', require('./notice'))

// 媒体湘大
router.get('/trend/media', require('./media'))
router.get('/trend/media/:count', require('./media'))

// 学术活动
router.get('/trend/cathedra', require('./cathedra'))
router.get('/trend/cathedra/:count', require('./cathedra'))

module.exports = router
