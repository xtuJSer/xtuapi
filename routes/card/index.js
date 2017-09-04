const router = require('express').Router(),
  path = require('../../config/default').xtuURL.library.path,
  checkLogin = require('../../middlewares/checkLogin')('xtuCard')

router.get('/', (req, res) => {
  res.status(200).send(Object.keys(path))
})

router.post('/login', require('./login'))

// router.get('/book', checkLogin, require('./book'))

// router.post('/renew', checkLogin, require('./renew'))

module.exports = router
