import * as path from 'path'
const MAX_LOOP_TIME = 3

import {
  getCookie,
  getImg,
  saveImg,
  editImg,
  spotImg,
  loginToJWXT,
  fetchEncoded,
  packEncoded
} from '../../crawlers/login/user'

import { checkFormat, successLogin } from '../../crawlers/login/common'

export default ({ username = '', password = '' }, { sid = {} }) => new Promise((resolve, reject) => {
  let isSuccess = false
  let isWrong = false
  let loopTime = 0
  let token = ''
  let { isFormat, message } = checkFormat({ username, password })

  if (!isFormat) {
    resolve({ message, isSuccess })
    throw new Error()
  }

  const imgDir = path.join(__dirname) + `/${Date.now()}.jpg`

  ;(async () => {
    while (!isSuccess && !isWrong && loopTime < MAX_LOOP_TIME) {
      try {
        const { cookie, appCookie } = await getCookie()
        const img = await getImg(cookie, appCookie)

        await saveImg({ img, username, imgDir })
        await editImg({ username, imgDir })

        let randomCode = await spotImg({ username, imgDir })
        let encoded = packEncoded({
          username,
          password,
          encoded: await fetchEncoded(cookie, appCookie)
        })

        await loginToJWXT({ randomCode, username, password, encoded, cookie, appCookie })

        const ret = successLogin('user')({ username, cookie, appCookie, sid })

        isSuccess = ret.isSuccess
        token = ret.token
      } catch (err) {
        loopTime++
        console.error(`${username} 登录失败: ${err}`)

        // 若用户的账号密码错误，则跳出循环
        if ((err + '').includes('用户名或密码错误')) {
          isWrong = true
        }
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
