const fs = require('fs')
const path = require('path')

const cheerio = require('cheerio')
const charset = require('superagent-charset')
const request = require('superagent')
charset(request)

const tesseract = require('node-tesseract')
const gm = require('gm')

const config = require('../../../config/default')
const imgDir = path.join(__dirname, '../../../public/images')

const header = config.header
const userUrl = config.xtuUrl.user
const loginUrl = userUrl.host
const postUrl = loginUrl + userUrl.path.login
const imgUrl = loginUrl + userUrl.path.verification

module.exports = function (req, res) {
  const username = req.body.username
  const password = req.body.password
  let cookie = req.session.xtu || ''

  const getCookie = () => {
    return new Promise((resolve, reject) => {
      request.get(loginUrl)
        .end((err, sres) => {
          if (err) { reject('获取登录Cookie失败') }
          cookie = sres.headers['set-cookie'].pop().split(';')[0]
          resolve(cookie)
        })
    })
  }

  const getImg = () => {
    return new Promise((resolve, reject) => {
      request.get(imgUrl)
        .set(header)
        .set('Cookie', cookie)
        .end((err, sres) => {
          if (err) { reject('获取验证码失败') }
          resolve(sres.body)
        })
    })
  }

  const saveImg = (img) => {
    return new Promise((resolve) => {
      fs.writeFileSync(imgDir + `/${username}.jpg`, img)
      resolve()
    })
  }

  const editImg = () => {
    return new Promise((resolve, reject) => {
      gm(imgDir + `/${username}.jpg`)
        .despeckle() //去斑
        .contrast(-2000) //对比度调整
        .write(imgDir + `/${username}_gm.jpg`, err => {
          if (err) { reject(`图片处理中出错: ${err}`) }
          resolve()
        })
    })
  }

  const spotImg = () => {
    return new Promise((resolve, reject) => {
      tesseract.process(imgDir + `/${username}_gm.jpg`, config.spotImgOptions, (err, ret) => {
        if (err) { reject(err) }
        ret = ret.replace(/\s*/gm, '').substr(0, 4).toLowerCase()
        if (ret.length !== 4 || ret.match(/\W/g) !== null) {
          reject(`验证码不合法: ${ret}`)
        }
        console.log(`验证码为: ${ret}`)
        resolve(ret)
      })
    })
  }

  const loginToJWXT = (ret) => {
    return new Promise ((resolve, reject) => {
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
            reject(`验证码错误: ${ret}`)
          } else {
            req.session.xtu = cookie
            resolve()
          }
        })
    })
  }

  const successLogin = () => {
    console.log('=== 成功登录 ===')
    res.status(200).json({ cookie })
    return true
  }

  ;(async () => {
    let isSuccess = false,
        isWrong = false,
        loopTime = 0
    if (req.session.xtu) {
      isSuccess = successLogin()
    }
    while (!isSuccess && loopTime < 6 && !isWrong) {
      try {
        await getCookie()
        await saveImg(await getImg())
        await editImg()
        await loginToJWXT(await spotImg())
        isSuccess = successLogin()
      } catch (err) {
        loopTime++
        if (err.indexOf('用户名或密码错误') > -1) { isWrong = true }
        console.log(`登录失败:\n ${err}`)
      }
    }

    if (isWrong) {
      res.status(500).send('用户名或密码错误')
    } else if (!isSuccess || loopTime === 6) {
      res.status(500).send('教务系统可能崩了')
    }

  })()
}