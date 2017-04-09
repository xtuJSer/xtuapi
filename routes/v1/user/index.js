const router = require('express').Router()
const user = require('../../../config/default').xtuUrl.user.path

router.get('/user', (req, res) => {
  res.status(200).send(Object.keys(user))
})

// 教务系统登录
router.post('/user/login', require('./login'))

module.exports = router