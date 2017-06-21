const router = require('express').Router()
const trend = require('../../config/default').xtuURL.trend.path

router.get('/', (req, res) => {
  res.status(200).send(Object.keys(trend))
})

// 校内新闻
router.get('/news', require('./news'))
router.get('/news/:count', require('./news'))

// 通知公告
router.get('/notice', require('./notice'))
router.get('/notice/:count', require('./notice'))

// 媒体湘大
router.get('/media', require('./media'))
router.get('/media/:count', require('./media'))

// 学术活动
router.get('/cathedra', require('./cathedra'))
router.get('/cathedra/:count', require('./cathedra'))

module.exports = router
