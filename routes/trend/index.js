const router = require('express').Router()

// 校园动态
router.get('/trend/news', require('./news'))
router.get('/trend/notice', require('./notice'))
router.get('/trend/media', require('./media'))

// 个人数据
// router.get('/user/score')

module.exports = router