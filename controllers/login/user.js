const path = require('path')
const MAX_LOOP_TIME = 5
const {
  user: {
    getCookie,
    getImg,
    saveImg,
    editImg,
    spotImg,
    loginToJWXT
  },
  comment: {
    checkFormat,
    successLogin
  }
} = require('../../crawlers').login

module.exports = ({ username = '', password = '' }, { sid = {} }) => new Promise((resolve, reject) => {
  let isSuccess = false
  let isWrong = false
  let loopTime = 0
  let token = ''
  let { isFormat, message } = checkFormat({ username, password })

  if (!isFormat) {
    resolve({ message, isSuccess })
    throw new Error()
  }

  const imgDir = path.join(__dirname) + `/${username}.jpg`

  ;(async () => {
    while (!isSuccess && loopTime <= MAX_LOOP_TIME && !isWrong) {
      try {
        const cookie = await getCookie()
        await saveImg({
          img: await getImg(cookie),
          username,
          imgDir
        })
        await editImg({ username, imgDir })

        let randomCode = await spotImg({ username, imgDir })
        await loginToJWXT({ randomCode, username, password, cookie })

        const ret = successLogin('user')({ username, cookie, sid })

        isSuccess = ret.isSuccess
        token = ret.token
      } catch (err) {
        loopTime++
        console.error(`登录失败: ${err}`)

        // 若用户的账号密码错误，则跳出循环
        if (err.message === '用户名或密码错误') {
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
