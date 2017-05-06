const router = require('express').Router()
const user = require('../../../config/default').xtuUrl.user.path
const checkLogin = require('../../../middlewares/checkLogin')

router.get('/user', (req, res) => {
  res.status(200).send(Object.keys(user))
})

// 教务系统登录
router.post('/user/login', require('./login'))
router.get('/user/login', (req, res, next) => {
  return res.status(500).send('登录需要 POST 请求')
})

// 默认获取最近一个学期的成绩
router.get('/user/course', checkLogin, require('./course'))
// 获取指定成绩
router.post('/user/course', checkLogin, require('./course'))

// 获取课程表
router.get('/user/class', checkLogin, require('./class'))

// 获取排名
router.get('/user/rank', checkLogin, require('./rank'))
router.post('/user/rank', checkLogin, require('./rank'))

// 空闲教室
router.get('/user/classroom', require('./classroom'))
router.post('/user/classroom', require('./classroom'))

module.exports = router
