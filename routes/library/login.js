const request = require('superagent')

const library = require('../../config/default').xtuURL.library
const header = require('../../config/default').header
const URL = library.host + library.path.login

module.exports = (req, res) => {
  let username = req.body.username
  let password = req.body.password

  request
    .post(URL)
    .type('form')
    .set(header)
    .send({
      barcode: username,
      password,
      login_type: '',
      _: ''
    })
    .end((err, sres) => {
      if (err) { throw new Error('登录失败') }
      let cookie = sres.headers['set-cookie'].pop().split(';')[0]
      req.session.xtuLibrary = cookie
      res.status(200).json({
        status: 'success',
        message: '成功登录',
        cookie
      })
    })
}
