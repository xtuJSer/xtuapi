const router = require('express').Router()

// 校园动态
router.get('/trends/news', require('./trends/news'))
router.get('/trends/notice', require('./trends/notice'))
router.get('/trends/media', require('./trends/media'))

// 个人数据
// router.get('/user/score')

module.exports = router