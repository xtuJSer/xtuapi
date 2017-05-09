const { user } = require('../../../config/prod')
const { checkFormat, getCookie, getImg, saveImg, editImg, spotImg, loginToJWXT, successLogin } = require('../../../crawlers/userLoginCrawler')

module.exports = (req, res) => new Promise((resolve, reject) => {
  let isRobot = req.body.isRobot || 0
  let isUser = !+isRobot

  let username = isUser ? req.body.username.trim() : user.username,       // 输入的学号
      password = isUser ? req.body.password.trim() : user.password,       // 输入的密码
      revoke = req.body.revoke || 0,                                      // 是否撤销 session 并重新登录，默认为否
      cookie = req.session.xtu || '',                                     // 查看是否已登录
      isSuccess = false,                                                  // 是否成功登录
      isWrong = false,                                                    // 用户的账号密码不正确
      loopTime = 0,                                                       // 登录失败后进入循环的统计
      { isFormat, errorMsg } = checkFormat(username, password)            // 判定用户输入值是否规范

  isUser && cookie && !revoke && (isSuccess = successLogin(res, isUser))  // 若是用户登录，则判断是否存在 session
  !isFormat && res.status(500).json(errorMsg)                             // 用户输入不规范，提前返回错误值，不进入登录逻辑

  ;(async () => {
    !isSuccess && console.log('--- 正在登录 ---')

    const MAX_LOOP_TIME = 6
    while (!isSuccess && loopTime <= MAX_LOOP_TIME && !isWrong && isFormat) {
      try {
        cookie = await getCookie()                                                              // 获取当前会话的 sessionId
        await saveImg(await getImg(cookie), username)                                           // 获取验证码，并保存到相应路径
        await editImg(username)                                                                 // 对验证码做处理，便于识别
        await loginToJWXT(await spotImg(username), req, username, password, cookie, isUser)     // 识别验证码并尝试登录教务系统
        isSuccess = successLogin(res, isUser)                                                   // 若无错误抛出则表示成功，返回数据
        !isUser && resolve(cookie)                                                              // 若不是用户操作，则返回 Promise
      } catch (err) {
        loopTime++
        console.error(`登录失败: ${err}`)
        if (err.indexOf('用户名或密码错误') > -1) { isWrong = true }                               // 若用户的账号密码错误，则跳出循环
      }
    }

    if (isWrong && isFormat) {
      res.status(500).json({ detail: '学号或密码错误', msg: 'wrong' })
    } else if ((!isSuccess || loopTime > MAX_LOOP_TIME) && isFormat) {
      res.status(500).json({ detail: '教务系统可能崩了', msg: 'error' })
    }
  })()
})
