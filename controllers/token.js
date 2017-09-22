const jwt = require('jsonwebtoken')

const { secret, expiresIn, prefix } = require('../config').token

const getToken = (ctx) => {
  let { authorization = '' } = ctx.headers
  const token = authorization.split(' ')[1]

  return token
}

const createToken = (username) => prefix + jwt.sign({ username }, secret, { expiresIn })

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
