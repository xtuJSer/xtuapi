const fs = require('fs')
const path = require('path')

const cheerio = require('cheerio')
const request = require('superagent')
require('superagent-charset')(request)

const tesseract = require('node-tesseract')
const gm = require('gm')

const config = require('../../../config/default')
const { user } = require('../../../config/prod')
const imgDir = path.join(__dirname, '../../../public/images')

const header = config.header
const userUrl = config.xtuUrl.user
const loginUrl = userUrl.host
const postUrl = loginUrl + userUrl.path.login
const imgUrl = loginUrl + userUrl.path.verification

module.exports = (req, res, isUser = true) => {
  let username = isUser ? req.body.username.trim() : user.username,       // 输入的学号
      password = isUser ? req.body.password.trim() : user.password,       // 输入的密码
      revoke = req.body.revoke || 0,                                      // 是否撤销 session 并重新登录，默认为否
      cookie = req.session.xtu || ''                                      // 查看是否已登录

  const getCookie = () => new Promise((resolve, reject) => {
    request.get(loginUrl)
      .end((err, sres) => {
        if (err) { reject('获取登录Cookie失败') }
        cookie = sres.headers['set-cookie'].pop().split(';')[0]
        resolve(cookie)
      })
  })

  const getImg = () => new Promise((resolve, reject) => {
    request.get(imgUrl)
      .set(header)
      .set('Cookie', cookie)
      .end((err, sres) => {
        if (err) { reject('获取验证码失败') }
        resolve(sres.body)
      })
  })

  const saveImg = (img) => new Promise((resolve) => {
    fs.writeFileSync(imgDir + `/${username}.jpg`, img)
    resolve()
  })

  const editImg = () => new Promise((resolve, reject) => {
    gm(imgDir + `/${username}.jpg`)
      .despeckle() //去斑
      .contrast(-2000) //对比度调整
      .write(imgDir + `/${username}_gm.jpg`, err => {
        if (err) { reject(`图片处理中出错`) }
        resolve()
      })
  })

  const spotImg = () => new Promise((resolve, reject) => {
    tesseract.process(imgDir + `/${username}_gm.jpg`, config.spotImgOptions, (err, ret) => {
      if (err) { reject(err) }
      ret = ret.replace(/\s*/gm, '').substr(0, 4).toLowerCase()
      if (ret.length !== 4 || ret.match(/\W/g) !== null) {
        reject(`验证码不合法`)
      }
      resolve(ret)
    })
  })

  const loginToJWXT = (ret) => new Promise ((resolve, reject) => {
    request.post(postUrl)
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
          isUser && (req.session.xtu = cookie)
          resolve()
        }
      })
  })

  const successLogin = () => {
    console.log('=== 成功登录 ===')
    isUser && res.status(200).json({
      msg: 'success',
      detail: '成功登录'
      // cookie
    })
    return true
  }

  (async () => {
    let isSuccess = false,    // 是否成功登录
        isWrong = false,      // 用户的账号密码不正确
        isFormat = true,      // 用户输入不规范，提前判定，不进入登录逻辑
        loopTime = 0          // 登录失败后进入循环的统计

    isUser && req.session.xtu && !revoke && (isSuccess = successLogin())

    if (username === undefined || (!password && password === undefined)) {
      isFormat = false
      res.status(500).json({ detail: '账号或密码不能为空', msg: 'wrong' })
    } else if (username.length !== 10) {
      isFormat = false
      res.status(500).json({ detail: '请输入正确的学号', msg: 'wrong' })
    } else if (password.length < 6) {
      isFormat = false
      res.status(500).json({ detail: '请输入正确的密码', msg: 'wrong' })
    }

    console.log('--- 正在登录 ---')
    while (!isSuccess && loopTime < 6 && !isWrong && isFormat) {
      try {
        await getCookie()
        await saveImg(await getImg())
        await editImg()
        await loginToJWXT(await spotImg())
        isSuccess = successLogin()
      } catch (err) {
        loopTime++
        console.error(err)
        if (err.indexOf('用户名或密码错误') > -1) { isWrong = true }
        console.error(`登录失败: ${err}`)
      }
    }

    if (isWrong && isFormat) {
      res.status(500).json({ detail: '学号或密码错误', msg: 'wrong' })
    } else if ((!isSuccess || loopTime === 6) && isFormat) {
      res.status(500).json({ detail: '教务系统可能崩了', msg: 'error' })
    }
  })()
}
