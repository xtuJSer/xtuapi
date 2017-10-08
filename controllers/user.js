const crawler = require('../crawlers').user

const getTopic = topic => async ({ sid, param }) => {
  let ret = {
    isSuccess: true,
    message: '',
    content: null
  }

  try {
    ret.content = await crawler[topic]({ sid, param })
  } catch (err) {
    ret.isSuccess = false
    ret.message = err
  }

  return ret
}

module.exports = async (ctx, { topic, decoded: { sid } }) => {
  const param = /post/i.test(ctx.method)
    ? ctx.request.body
    : ctx.query

  const { isSuccess, message, content } = await getTopic(topic)({
    sid: sid && sid.user,
    param
  })

  ctx.assert(isSuccess, 401, message)
  return content
}
