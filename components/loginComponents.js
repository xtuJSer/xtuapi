const fs = require('fs'),
      path = require('path'),
      cheerio = require('cheerio'),
      request = require('superagent')

require('superagent-charset')(request)

const tesseract = require('node-tesseract'),
      gm = require('gm')

const config = require('../config/default'),
      imgDir = path.join(__dirname, '../public/images'),
      header = config.header,
      userURL = config.xtuURL.user,
      loginURL = userURL.host,
      postURL = loginURL + userURL.path.login,
      imgURL = loginURL + userURL.path.verification

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
  request.get(loginURL)
    .end((err, sres) => {
      if (err) { reject('获取登录Cookie失败') }
      let cookie = sres.headers['set-cookie'].pop().split(';')[0]
      resolve(cookie)
    })
})

const getImg = cookie => new Promise((resolve, reject) => {
  request.get(imgURL)
    .set(header)
    .set('Cookie', cookie)
    .end((err, sres) => {
      if (err) { reject('获取验证码失败') }
      resolve(sres.body)
    })
})

const saveImg = (img, username) => new Promise((resolve) => {
  fs.writeFileSync(imgDir + `/${username}.jpg`, img)
  resolve()
})

const editImg = username => new Promise((resolve, reject) => {
  gm(imgDir + `/${username}.jpg`)
    .despeckle() //去斑
    .contrast(-2000) //对比度调整
    .write(imgDir + `/${username}_gm.jpg`, err => {
      if (err) { reject(`图片处理中出错`) }
      resolve()
    })
})

const spotImg = username => new Promise((resolve, reject) => {
  tesseract.process(imgDir + `/${username}_gm.jpg`, config.spotImgOptions, (err, ret) => {
    if (err) { reject(err) }
    ret = ret.replace(/\s*/gm, '').substr(0, 4).toLowerCase()
    if (ret.length !== 4 || ret.match(/\W/g) !== null) {
      reject(`验证码不合法`)
    }
    resolve(ret)
  })
})

const loginToJWXT = (ret, req, username, password, cookie, isUser) => new Promise ((resolve, reject) => {
  request.post(postURL)
    .type('form')
    .set(header)
    .set('Cookie', cookie)
    .charset('gbk')
    .send({
      USERNAME: username,
      PASSWORD: password,
      RANDOMCODE: ret
    })
    .end((err, sres) => {
      if (err) { reject(err) }
      if (sres.text.indexOf('用户名或密码错误') > -1) {
        reject('用户名或密码错误')
      } else if (sres.text.indexOf('验证码错误') > -1) {
        reject(`验证码错误`)
      } else {
        isUser && (req.session.xtuUser = cookie)
        resolve()
      }
    })
})

const successLogin = (res, cookie, isUser) => {
  console.log('=== 成功登录 ===')
  isUser && res.status(200).json({
    status: 'success',
    message: '成功登录',
    cookie
  })
  return true
}

module.exports = {
  checkFormat,
  getCookie,
  getImg,
  saveImg,
  editImg,
  spotImg,
  loginToJWXT,
  successLogin
}