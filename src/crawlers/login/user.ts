import * as fs from 'fs'
import * as gm from 'gm'
import * as request from 'superagent'

const { promisify } = require('util')
const tesseract = require('node-tesseract')

import _h from '../../utils/headers'
import _c from '../../utils/charset'
import config from '../../config/user'

const headers = _h.updateHeaders()
const {
  url: { host: hostURL, path: pathURL },
  spotImgOptions
} = config

const { verification, login, encoded } = pathURL
const imgURL = hostURL + verification
const loginURL = hostURL + login

type TYPE = {
  randomCode?: string,
  username?: string,
  password?: string,
  cookie?: string,
  appCookie?: string,
  imgDir?: string,
  encoded?: string,
  img?: string
};

export const getCookie = () => new Promise((resolve, reject) => {
  request
    .get(hostURL)
    .set(headers)
    .end((err: any, sres: object) => {
      if (err) {
        return reject(err)
      }

      const cookies = sres.headers['set-cookie']
      let cookie = cookies.find(el => el.includes('JSESSIONID'))
      let appCookie = cookies.find(el => el.includes('SERVERID'))

      return resolve({
        cookie: cookie.split(';')[0],
        appCookie: appCookie.split(';')[0]
      })
    })
})

export const getImg = (cookie: string, appCookie: string) => new Promise((resolve, reject) => {
  request
    .get(imgURL)
    .set(headers)
    .set('Cookie', cookie + ';' + appCookie)
    .end((err, sres) => {
      if (err) {
        return reject(err)
      }
      resolve(sres.body)
    })
})

export const saveImg = ({ username, img, imgDir }: TYPE) => new Promise((resolve) => {
  const writeFile = promisify(fs.writeFile)

  writeFile(imgDir, img).then(() => resolve())
})

export const editImg = ({ username, imgDir }: TYPE) => new Promise((resolve, reject) => {
  gm(imgDir)
    .despeckle() // 去斑
    .contrast(-2000) // 对比度调整
    .write(imgDir, (err) =>
      err ? reject(err) : resolve()
    )
})

export const spotImg = ({ username, imgDir }: TYPE) => new Promise((resolve, reject) => {
  tesseract.process(imgDir, spotImgOptions, (err: any, text: string) => {
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

export const fetchEncoded = (cookie: string, appCookie: string) => new Promise((resolve, reject) => {
  request
    .post(loginURL + encoded)
    .set(headers)
    .set('Cookie', cookie + ';' + appCookie)
    .end((err: any, sres: any) => {
      if (err) {
        return reject(err)
      }

      resolve(JSON.parse(sres.text).data)
    })
})

export const packEncoded = ({ username, password, encoded = '' }: TYPE) => {
  const code = username + '%%%' + password

  let ret = '';
  let scode = encoded.split("#")[0];
  let sxh = encoded.split("#")[1];

  for (let i = 0; i < code.length; i++) {
    if (i < 20) {
      ret = ret + code.substring(i, i + 1) + scode.substring(0,parseInt(sxh.substring(i, i + 1)));
      scode = scode.substring(parseInt(sxh.substring(i, i + 1)), scode.length);
    }else{
      ret = ret + code.substring(i, code.length);
      i = code.length;
    }
  }

  return ret
}

export const loginToJWXT = ({ randomCode, username, password, encoded, cookie, appCookie }: TYPE) => new Promise((resolve, reject) => {
  request
    .post(loginURL)
    .type('form')
    .charset('gbk')
    .set({
      ...headers,
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
      Cookie: cookie + ';' + appCookie,
      Referer: 'http://jwxt.xtu.edu.cn/jsxsd/xk/LoginToXk'
    })
    .send({
      USERNAME: username,
      PASSWORD: password,
      RANDOMCODE: randomCode,
      encoded
    })
    .end((err: any, sres: any) => {
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
