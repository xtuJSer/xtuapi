const { user } = require('../../../config/prod')
const { checkFormat, getCookie, getImg, saveImg, editImg, spotImg, loginToJWXT, successLogin } = require('../../../crawlers/userLoginCrawler')

module.exports = (req, res, isUser = true) => new Promise((resolve, reject) => {
  let username = isUser ? req.body.username.trim() : user.username,       // 输入的学号
      password = isUser ? req.body.password.trim() : user.password,       // 输入的密码
      revoke = req.body.revoke || 0,                                      // 是否撤销 session 并重新登录，默认为否
      cookie = req.session.xtu || ''                                      // 查看是否已登录

  ;(async () => {
    let isSuccess = false,    // 是否成功登录
        isWrong = false,      // 用户的账号密码不正确
        loopTime = 0          // 登录失败后进入循环的统计

    isUser && cookie && !revoke && (isSuccess = successLogin(res, isUser))  // 若是用户登录，则判断是否存在 session

    let { isFormat, errorMsg } = checkFormat(username, password)          // 用户输入不规范，提前判定，不进入登录逻辑
    !isFormat && res.status(500).json(errorMsg)

    !isSuccess && console.log('--- 正在登录 ---')
    while (!isSuccess && loopTime <= 6 && !isWrong && isFormat) {
      try {
        cookie = await getCookie()
        await saveImg(await getImg(cookie), username)
        await editImg(username)
        await loginToJWXT(await spotImg(username), req, username, password, cookie, isUser)
        isSuccess = successLogin(res, isUser)
        isSuccess && resolve(cookie)
      } catch (err) {
        loopTime++
        if (err.indexOf('用户名或密码错误') > -1) { isWrong = true }         // 若用户的账号密码错误，则跳出循环
        console.error(`登录失败: ${err}`)
      }
    }

    if (isWrong && isFormat) {
      res.status(500).json({ detail: '学号或密码错误', msg: 'wrong' })
    } else if ((!isSuccess || loopTime === 6) && isFormat) {
      res.status(500).json({ detail: '教务系统可能崩了', msg: 'error' })
    }
  })()
})
