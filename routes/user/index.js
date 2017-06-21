const router = require('express').Router(),
      path = require('../../config/default').xtuURL.user.path,
      checkLogin = require('../../middlewares/checkLogin')

router.get('/', (req, res) => {
  res.status(200).send(Object.keys(path))
})

// 教务系统登录
router.post('/login', require('./login'))
router.get('/login', (req, res, next) => {
  return res.status(500).send('登录需要 POST 请求')
})

// 获取成绩
router.get('/course', checkLogin, require('./course'))
router.post('/course', checkLogin, require('./course'))

// 获取课程表
router.get('/class', checkLogin, require('./class'))

// 获取排名
router.get('/rank', checkLogin, require('./rank'))
router.post('/rank', checkLogin, require('./rank'))

// 空闲教室
router.get('/classroom', require('./classroom'))
router.post('/classroom', require('./classroom'))
// 空闲课程词条
router.post('/classroom/message', require('./classroom_message'))

module.exports = router
