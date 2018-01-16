const fs = require('fs')
const { promisify } = require('util')
const tesseract = require('node-tesseract')
const gm = require('gm')
const request = require('superagent')
require('superagent-charset')(request)

const { headers: { updateHeaders } } = require('../../utils')

const headers = updateHeaders()

const {
  url: { host: hostURL, path: pathURL },
  spotImgOptions
} = require('../../config').user

const { verification, login } = pathURL
const imgURL = hostURL + verification
const loginURL = hostURL + login

const getCookie = () => new Promise((resolve, reject) => {
  request
    .get(hostURL)
    .set(headers)
    .end((err, sres) => {
      if (err) {
        return reject(err)
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
        return reject(err)
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
    .write(imgDir, err =>
      err ? reject(err) : resolve()
    )
})

const spotImg = ({ username, imgDir }) => new Promise((resolve, reject) => {
  tesseract.process(imgDir, spotImgOptions, (err, text) => {
    if (err) {
      return reject(err)
    }
    fs.unlinkSync(imgDir)

    text = text
      .replace(/[^a-zA-Z0-9]/gm, '')
      .substr(0, 4)
      .toLowerCase()

    if (text.match(/\W/g) !== null) {
      err = '验证码不合法'
      return reject(err)
    }
    resolve(text)
  })
})

const loginToJWXT = ({ randomCode, username, password, cookie }) => new Promise((resolve, reject) => {
  request
    .post(loginURL)
    .type('form')
    .set({
      ...headers,
      Cookie: cookie,
      Referer: 'http://jwxt.xtu.edu.cn/jsxsd/',
      Origin: 'http://jwxt.xtu.edu.cn',
      Host: 'jwxt.xtu.edu.cn'
    })
    .charset('gbk')
    .send({
      USERNAME: username,
      PASSWORD: password,
      RANDOMCODE: randomCode
    })
    .end((err, sres) => {
      if (err) {
        return reject(err)
      }
      if (sres.text.includes('用户名或密码错误')) {
        err = '用户名或密码错误'
        return reject(err)
      }
      if (sres.text.includes('验证码错误')) {
        err = '验证码错误'
        return reject(err)
      }
      resolve()
    })
})

module.exports = {
  getCookie,
  getImg,
  saveImg,
  editImg,
  spotImg,
  loginToJWXT
}
