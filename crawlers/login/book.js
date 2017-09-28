const request = require('superagent')

const { updateHeaders } = require('../../utils').headers
const {
  url: {
    host, path: { login }
  }
} = require('../../config').book
const loginURL = host + login

const loginToLibrary = ({ username, password }) => new Promise((resolve, reject) => {
  const headers = updateHeaders()

  request
    .post(loginURL)
    .type('form')
    .set(headers)
    .send({
      barcode: username,
      password,
      login_type: '',
      _: ''
    })
    .end((err, sres) => {
      if (err) {
        let msg = '登录失败'
        reject(msg)
      }

      const cookie = sres.headers['set-cookie'].pop().split(';')[0]
      resolve(cookie)
    })
})

module.exports = {
  loginToLibrary
}
