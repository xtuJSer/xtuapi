const fs = require('fs')
const { promisify } = require('util')
const tesseract = require('node-tesseract')
const gm = require('gm')
const request = require('superagent')
require('superagent-charset')(request)

const {
  token: { createToken },
  headers: { updateHeaders }
} = require('../../utils')

const headers = updateHeaders()

const {
  url: { host: hostURL, path: pathURL },
  spotImgOptions
} = require('../../config').user

const { verification, login } = pathURL
const imgURL = hostURL + verification
const loginURL = hostURL + login

const checkFormat = ({ username, password }) => {
  let message = ''
  username && (username = username.trim())
  password && (password = password.trim())

  if (!username || !password) {
    message = '账号或密码不能为空'
  } else if (isNaN(+username)) {
    message = '请输入正确的学号'
  } else if (password.length < 6) {
    message = '请输入正确的密码'
  }
  return {
    isFormat: !message.length,
    message
  }
}

const getCookie = () => new Promise((resolve, reject) => {
  request
    .get(hostURL)
    .end((err, sres) => {
      if (err) {
        reject(err)
      }

      let cookie = sres.headers['set-cookie'].pop().split(';')[0]
      resolve(cookie)
    })
})

const getImg = cookie => new Promise((resolve, reject) => {
  request
    .get(imgURL)
    .set(headers)
    .set('Cookie', cookie)
    .end((err, sres) => {
      if (err) {
        reject(err)
      }
      resolve(sres.body)
    })
})

const saveImg = ({ username, img, imgDir }) => new Promise((resolve) => {
  const writeFile = promisify(fs.writeFile)

  writeFile(imgDir, img).then(() => resolve())
})

const editImg = ({ username, imgDir }) => new Promise((resolve, reject) => {
  gm(imgDir)
    .despeckle() // 去斑
    .contrast(-2000) // 对比度调整
    .write(imgDir, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
})

const spotImg = ({ username, imgDir }) => new Promise((resolve, reject) => {
  tesseract.process(imgDir, spotImgOptions, (err, ret) => {
    if (err) { reject(err) }
    fs.unlinkSync(imgDir)

    ret = ret.replace(/\s*/gm, '').substr(0, 4).toLowerCase()
    if (ret.length !== 4 || ret.match(/\W/g) !== null) {
      err = '验证码不合法'
      reject(err)
    }
    resolve(ret)
  })
})

const loginToJWXT = ({ randomCode, username, password, cookie }) => new Promise((resolve, reject) => {
  request
    .post(loginURL)
    .type('form')
    .set(headers)
    .set('Cookie', cookie)
    .charset('gbk')
    .send({
      USERNAME: username,
      PASSWORD: password,
      RANDOMCODE: randomCode
    })
    .end((err, sres) => {
      if (err) { reject(err) }
      if (sres.text.includes('用户名或密码错误')) {
        err = '用户名或密码错误'
        reject(err)
      } else if (sres.text.includes('验证码错误')) {
        err = '验证码错误'
        reject(err)
      }
      resolve()
    })
})

const successLogin = ({ username, cookie, sid }) => ({
  token: createToken('user')({ username, cookie, sid }),
  isSuccess: true
})

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
