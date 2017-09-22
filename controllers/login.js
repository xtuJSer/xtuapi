const fs = require('fs')
const path = require('path')
const tesseract = require('node-tesseract')
const gm = require('gm')
const request = require('superagent')
require('superagent-charset')(request)

const Model = require('../models').user
const { createToken } = require('./token')

const imgDir = path.join(__dirname)
const {
  login: { host: hostURL, path: pathURL },
  headers,
  spotImgOptions
} = require('../config').user

const { verification, login } = pathURL
const imgURL = hostURL + verification
const loginURL = hostURL + login

const checkFormat = ({ username, password }) => {
  let message = ''

  if (!username || !password) {
    message = '账号或密码不能为空'
  } else if (username.length !== 10) {
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

const saveImg = ({ img, username }) => new Promise((resolve) => {
  fs.writeFileSync(imgDir + `/${username}.jpg`, img)
  resolve()
})

const editImg = username => new Promise((resolve, reject) => {
  gm(imgDir + `/${username}.jpg`)
    .despeckle() // 去斑
    .contrast(-2000) // 对比度调整
    .write(imgDir + `/${username}_gm.jpg`, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
})

const spotImg = username => new Promise((resolve, reject) => {
  // const { promisify } = require('util')
  // const spot = promisify(tesseract.process)

  // console.log(spotImgOptions.binary)

  // spot(imgDir + `/${username}_gm.jpg`, spotImgOptions)
  //   .then((ret) => {
  //     ret = ret.replace(/\s*/gm, '').substr(0, 4).toLowerCase()

  //     if (ret.length !== 4 || ret.match(/\W/g) !== null) {
  //       throw new Error('验证码不合法')
  //     }
  //     resolve(ret)
  //   })

  tesseract.process(imgDir + `/${username}_gm.jpg`, spotImgOptions, (err, ret) => {
    if (err) { reject(err) }

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
        resolve('用户名或密码错误')
      } else if (sres.text.includes('验证码错误')) {
        resolve('验证码错误')
      } else {
        // isUser && (req.session.xtuUser = cookie)
        // 数据库操作
        resolve()
      }
    })
})

const successLogin = ({ username, cookie }) => new Promise((resolve, reject) => {
  const token = createToken(username)

  new Model({
    username,
    sid: cookie,
    token
  }).save()

  resolve({
    token,
    isSuccess: true
  })
})

module.exports = ({ username, password }) => new Promise((resolve, reject) => {
  let isSuccess = false
  let isWrong = false
  let loopTime = 0
  let { isFormat, message } = checkFormat({ username, password })
  let token = ''

  if (!isFormat) {
    resolve({ message, isSuccess })
    throw new Error()
  }

  ;(async () => {
    const MAX_LOOP_TIME = 6

    while (!isSuccess && loopTime <= MAX_LOOP_TIME && !isWrong) {
      try {
        const cookie = await getCookie()
        await saveImg({
          img: await getImg(cookie),
          username
        })
        await editImg(username)

        let randomCode = await spotImg(username)
        console.log(randomCode)

        await loginToJWXT({ randomCode, username, password, cookie })

        const ret = await successLogin({ username, cookie })

        isSuccess = ret.isSuccess
        token = ret.token
      } catch (err) {
        loopTime++
        console.error(`登录失败: ${err}`)

        if (err.includes('用户名或密码错误')) { isWrong = true } // 若用户的账号密码错误，则跳出循环
      }
    }

    if (isWrong && isFormat) {
      message = '学号或密码错误'
    } else if ((!isSuccess || loopTime > MAX_LOOP_TIME) && isFormat) {
      message = '教务系统可能崩了'
    }

    resolve({ isSuccess, token, message })
  })()
})
