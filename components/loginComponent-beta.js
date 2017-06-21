const fs = require('fs'),
      path = require('path'),
      cheerio = require('cheerio'),
      request = require('superagent')

require('superagent-charset')(request)

const config = require('../config/default'),
      header = config.header,
      userURL = config.xtuURL.card,
      loginURL = userURL.host,
      postURL = loginURL + userURL.path.login

const checkFormat = (username, password) => {
  let errorMsg = null

  if (username === undefined || (!password && password === undefined)) {
    errorMsg = { message: '账号或密码不能为空', status: 'wrong' }
  } else if (username.length !== 10) {
    errorMsg = { message: '请输入正确的学号', status: 'wrong' }
  } else if (password.length < 6) {
    errorMsg = { message: '请输入正确的密码', status: 'wrong' }
  }
  return {
    isFormat: !errorMsg,
    errorMsg
  }
}

const getCookie = () => new Promise((resolve, reject) => {
  request.get(loginURL + 'homeLogin.action')
    .end((err, sres) => {
      if (err) { reject('获取登录Cookie失败') }
      let cookie = sres.headers['set-cookie'].pop().split(';')[0]
      resolve(cookie)
    })
})

const loginToJWXT = (ret, req, username, password, cookie) => new Promise ((resolve, reject) => {
  console.log(postURL)
  request.post(postURL)
    .type('form')
    .set(header)
    .set('Cookie', cookie)
    .charset('utf-8')
    .send({
      name: username,
      passwd: password,
      userType: 1,
      loginType: 2,
      rand: 0,
      // 'imageField.x': 11,
      // 'imageField.y': 22
    })
    .end((err, sres) => {
      if (err) { reject(err) }
      require('fs').writeFileSync('./login.html', sres.text)
      // if (sres.text.indexOf('登陆失败，密码错误') > -1) {
      //   reject('登陆失败，密码错误')
      // } else if (sres.text.indexOf('验证码错误，登陆失败') > -1) {
      //   reject(`验证码错误，登陆失败`)
      // }
      if (sres.text.indexOf('欢迎您') === -1) {
        reject('失败')
      } else {
        req.session.xtuCard = cookie
        resolve()
      }
    })
})

const successLogin = (res, cookie) => {
  console.log('=== 成功登录 ===')
  res.status(200).json({
    status: 'success',
    message: '成功登录',
    cookie
  })
  return true
}

module.exports = {
  checkFormat,
  getCookie,
  loginToJWXT,
  successLogin
}