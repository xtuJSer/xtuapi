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

  // let cookie = req.session.xtu || ''
  let cookie
  // let isSuccess = false;

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
          if (err) { reject(err) }
          resolve()
        })
    })
  }

  const spotImg = () => {
    return new Promise((resolve, reject) => {
      tesseract.process(imgDir + `/${username}_gm.jpg`, config.spotImgOptions, (err, ret) => {
        if (err) { reject(err) }
        ret = ret.replace(/\s*/gm, '').substr(0, 4).toLowerCase()
        resolve(ret)
      })
    })
  }

  ;(async () => {
    try {
      await getCookie()
      await saveImg(await getImg())
      await editImg()
      let ret = await spotImg()
      console.log(ret)
      res.status(200).send('登录成功')
    } catch (err) {
      res.status(500).send(`登录失败: ${err}`)
    }
  })()

  //       tesseract.process('./img/gm.jpg', options, function (err1, ret) {
  //           if (err1) { throw new Error(err1) }
  //           ret = ret.replace(/[\r\n\s]/gm, '').substr(0, 4).toLowerCase()
  //           console.log(ret)
  //           if (ret.length !== 4 || ret.match(/\W/g) !== null) {
  //             console.log('验证码不符合要求 ' + ret)
  //             res.status(500).send('验证码不正确，登录失败: ' + ret)
  //             throw new Error('验证码不符合要求 ' + ret)
  //           }
  //           superagent
  //             .post(postUrl)
  //             .type('form')
  //             .set(header)
  //             .set('Cookie', cookie)
  //             .charset('gbk')
  //             .send({
  //               USERNAME: username,
  //               PASSWORD: password,
  //               RANDOMCODE: ret
  //             })
  //             .end((err2, sres) => {
  //               if (err2) {
  //                 throw new Error(err2)
  //               }

  //               if (sres.text.indexOf('用户名或密码错误') === -1) {
  //                 console.log('成功登录')
  //                 // let $ = cheerio.load(sres.text)
  //                 // fs.writeFileSync('login_test', sres.text)
  //                 // req.session.xtu = cookie
  //                 // console.log('成功申请到的 cookie, 并存入 req.session: ' + req.session.xtu)
  //                 // res.send('Success...')
  //                 res.status(200).send('成功登录')
  //               }

  //               else {
  //                 console.log(sres.text)
  //                 console.log('验证码不正确, 登录失败: ' + ret)
  //                 res.status(500).send('验证码不正确，登录失败: ' + ret)
  //               }
  //             })
  //         })
  //     })
  // })
  // .catch((err) => {
  //   res.status(500).send('登录过程发生错误')
  // })
}