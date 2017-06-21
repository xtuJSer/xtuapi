const router = require('express').Router(),
      path = require('../../config/default').xtuURL.library.path,
      checkLogin = require('../../middlewares/checkLogin')('xtuLibrary')

router.get('/', (req, res) => {
  res.status(200).send(Object.keys(path))
})

router.post('/login', require('./login'))

router.get('book', (req, res) => {

})

// router.get('')

module.exports = router