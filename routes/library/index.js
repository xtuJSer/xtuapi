const router = require('express').Router(),
      path = require('../../config/default').xtuURL.library.path

router.get('/', (req, res) => {
  res.status(200).send(Object.keys(path))
})

router.post('/login', )

router.get('book', (req, res) => {

})

// router.get('')

module.exports = router