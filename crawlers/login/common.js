const { createToken } = require('../../utils').token

const successLogin = (type) => ({ username, cookie, sid }) => ({
  token: createToken(type)({ username, cookie, sid }),
  isSuccess: true
})

const checkFormat = ({ username, password }) => {
  let message = ''
  username && (username = username.trim())
  password && (password = password.trim())

  if (!username || !password) {
    message = '账号或密码不能为空'
  } else if (isNaN(+username)) {
    message = '请输入正确的学号'
  } else if (password.length < 6) {
    message = '请输入正确的密码'
  }
  return {
    isFormat: !message.length,
    message
  }
}

module.exports = {
  successLogin,
  checkFormat
}
