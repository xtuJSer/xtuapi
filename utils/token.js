const jwt = require('jsonwebtoken')

const { secret, expiresIn, prefix } = require('../config').token

const getToken = ({ headers = {} }) => {
  let { authorization = '' } = headers
  const token = authorization.split(' ')[1]

  return token || ''
}

const createToken = ({ username, cookie: sid }) => prefix + jwt.sign({ username, sid }, secret, { expiresIn })

const decodeToken = ({ token, secret }) => jwt.verify(token, secret)

const verifyToken = (token = '') => new Promise(async (resolve, reject) => {
  let decoded = null
  const ret = {
    message: '',
    isSuccess: true,
    decoded
  }

  try {
    decoded = decodeToken({ token, secret })

    if (decoded.exp <= Date.now() / 1000) {
      throw new Error('token 已过期，请重新登录 🤕')
    }
    ret.decoded = decoded
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
