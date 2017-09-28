const jwt = require('jsonwebtoken')

const { secret, expiresIn, prefix } = require('../config').token

/**
 * 获取请求头中的 token
 */
const getToken = ({ headers = {} }) => {
  let { authorization = '' } = headers
  const token = authorization.split(' ')[1]

  return token || ''
}

/**
 * 根据 type 创建 token
 */
const createToken = (type) => ({ username, cookie, sid = {} }) => {
  sid[type] = cookie
  console.log(sid)

  return prefix + jwt.sign({ username, sid }, secret, { expiresIn })
}

/**
 * 解析 token
 */
const decodeToken = ({ token, secret }) => jwt.verify(token, secret)

/**
 * 验证 token
 */
const verifyToken = (type) => (token = '') => new Promise(async (resolve, reject) => {
  let decoded = {}
  const ret = {
    message: '',
    isSuccess: true,
    decoded
  }

  try {
    decoded = decodeToken({ token, secret })
    ret.decoded = decoded

    if (decoded.exp <= Date.now() / 1000) {
      throw new Error('已过期，请重新登录 🤕')
    }

    if (!decoded.sid[type]) {
      throw new Error('未登录 😷')
    }
  } catch (err) {
    ret.message = err
    ret.isSuccess = false
  }

  resolve(ret)
})

module.exports = {
  getToken,
  createToken,
  verifyToken,
  decodeToken
}
