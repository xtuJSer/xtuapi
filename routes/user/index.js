const router = require('express').Router(),
  path = require('../../config/default').xtuURL.user.path,
  checkLogin = require('../../middlewares/checkLogin')('xtuUser')

router.get('/', (req, res) => {
  res.status(200).send(Object.keys(path))
})

// 教务系统登录
router.post('/login', require('./login'))

// 获取成绩
router.get('/course', checkLogin, require('./course'))
router.post('/course', checkLogin, require('./course'))

// 获取课程表
router.get('/klass', checkLogin, require('./klass'))

// 获取排名
router.get('/rank', checkLogin, require('./rank'))
router.post('/rank', checkLogin, require('./rank'))

// 空闲教室
router.get('/classroom', require('./classroom'))
router.post('/classroom', require('./classroom'))
// 空闲课程词条
router.post('/classroom/message', require('./classroom_message'))

router.get('/info', require('./info'))

router.get('/exam', require('./exam'))

module.exports = router
