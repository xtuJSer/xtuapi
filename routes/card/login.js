const { user } = require('../../config/prod')
const { checkFormat, getCookie, getImg, saveImg, editImg, spotImg, loginToJWXT, successLogin } = require('../../components/loginComponent-beta')

module.exports = (req, res) => {
  let username = req.body.username        // 输入的学号
      password = req.body.password        // 输入的密码

  username === '' && (username = username.trim())
  password === '' && (password = password.trim())

  let revoke = req.body.revoke || 0,                                      // 是否撤销 session 并重新登录，默认为否
      cookie = req.session.xtuCard || '',                                 // 查看是否已登录
      isSuccess = false,                                                  // 是否成功登录
      isWrong = false,                                                    // 用户的账号密码不正确
      loopTime = 0,                                                       // 登录失败后进入循环的统计
      { isFormat, errorMsg } = checkFormat(username, password)            // 判定用户输入值是否规范

  cookie && !revoke && (isSuccess = successLogin(res, cookie))            // 若是用户登录，则判断是否存在 session
  !isFormat && res.status(500).json(errorMsg)                             // 用户输入不规范，提前返回错误值，不进入登录逻辑

  ;(async () => {
    !isSuccess && console.log('--- 正在登录 ---')

    const MAX_LOOP_TIME = 20
    while (!isSuccess && loopTime <= MAX_LOOP_TIME && !isWrong && isFormat) {
      console.log(loopTime)
      try {
        cookie = await getCookie()
        await loginToJWXT(0, req, username, password, cookie)
        isSuccess = successLogin(res, cookie)
      } catch (err) {
        loopTime++
        console.error(`登录失败: ${err}`)
        if (err.indexOf('登陆失败，密码错误') > -1) { isWrong = true }     // 若用户的账号密码错误，则跳出循环
      }
    }

    if (isWrong && isFormat) {
      res.status(500).json({ detail: '学号或密码错误', msg: 'wrong' })
    } else if ((!isSuccess || loopTime > MAX_LOOP_TIME) && isFormat) {
      res.status(500).json({ detail: '教务系统可能崩了', msg: 'error' })
    }
  })()
}
