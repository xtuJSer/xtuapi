const jwt = require('jsonwebtoken')

const { secret, expiresIn, prefix } = require('../config').token
const Model = require('../models').user

const getToken = ({ headers = {} }) => {
  let { authorization = '' } = headers
  const token = authorization.split(' ')[1]

  return token || ''
}

const createToken = (username) => prefix + jwt.sign({ username }, secret, { expiresIn })

const verifyToken = (token) => new Promise(async (resolve, reject) => {
  let decoded = null
  const ret = {
    message: '',
    isSuccess: true
  }

  try {
    decoded = jwt.verify(token, secret)
    if (decoded.exp <= Date.now() / 1000) { throw new Error('token 已过期') }

    let sid = await Model.getSidByToken({ token })
    if (!sid) { throw new Error('token 已更新') }
  } catch (err) {
    ret.message = err
    ret.isSuccess = false
  }

  resolve(ret)
})

module.exports = { getToken, createToken, verifyToken }
