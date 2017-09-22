const jwt = require('jsonwebtoken')

const { secret } = require('../config')

const getToken = (ctx) => {
  let { authorization = '' } = ctx.headers
  const token = authorization.split(' ')[1]

  return token
}

const createToken = (username) => jwt.sign({ username }, secret, {
  expiresIn: '1h'
})

const verifyToken = (token) => {
  let decoded = null

  try {
    decoded = jwt.verify(token, secret)
    if (decoded.exp <= Date.now() / 1000) { throw new Error() }
  } catch (err) {
    return false
  }

  return true
}

module.exports = {
  getToken,
  createToken,
  verifyToken
}
