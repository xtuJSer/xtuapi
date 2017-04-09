const router = require('express').Router()
const user = require('../../../config/default').xtuUrl.user.path

router.get('/user', (req, res) => {
  res.status(200).send(Object.keys(user))
})

// 教务系统登录
router.post('/user/login', require('./login'))

// 获取成绩
router.post('/user/course', require('./course'))
// 默认获取最近一个学期的成绩
router.get('/user/course', require('./course'))

module.exports = router