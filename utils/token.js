const jwt = require('jsonwebtoken')

const { secret, expiresIn, prefix } = require('../config').token

const getToken = ({ headers = {} }) => {
  let { authorization = '' } = headers
  const token = authorization.split(' ')[1]

  return token || ''
}

const createToken = (type) => ({ username, cookie }) => prefix + jwt.sign(
  {
    username,
    ['sid_' + type]: cookie
  },
  secret,
  { expiresIn }
)

const decodeToken = ({ token, secret }) => jwt.verify(token, secret)

const verifyToken = (type) => (token = '') => new Promise(async (resolve, reject) => {
  let decoded = null
  const ret = {
    message: '',
    isSuccess: true,
    decoded
  }

  try {
    decoded = decodeToken({ token, secret })
    console.log(decoded)

    if (decoded.exp <= Date.now() / 1000) {
      throw new Error('已过期，请重新登录 🤕')
    }

    if (!decoded['sid_' + type]) {
      throw new Error('未登录 😷')
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
