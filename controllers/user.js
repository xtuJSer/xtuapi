const crawler = require('../crawlers').user

const getTopic = topic => async ({ sid, body = '' }) => {
  let ret = {
    isSuccess: true,
    message: '',
    content: null
  }

  try {
    ret.content = await crawler[topic]({ sid, body })
  } catch (e) {
    ret.isSuccess = false
    ret.message = e
  }

  return ret
}

module.exports = async (ctx, { topic, decoded: { sid } }) => {
  const { body } = /post/i.test(ctx.method) ? ctx.request : {}
  const { isSuccess, message, content } = await getTopic(topic)({
    sid: sid.user,
    body
  })

  ctx.assert(isSuccess, 401, message)
  return content
}
