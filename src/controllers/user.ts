import crawler from '../crawlers/user'

type USER = {
  sid: string,
  param: string
};

const getTopic = (topic: string) => (
  async ({ sid, param }: USER) => {
    const ret = {
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
)

export default async (ctx, { topic, decoded: { sid } }) => {
  const param = /post/i.test(ctx.method)
    ? ctx.data
    : ctx.query

  const { isSuccess, message, content } = await getTopic(topic)({
    sid: sid && sid.user,
    param
  })

  if (!isSuccess) {
    ctx.status = 401
    throw new Error(message)
  }
  return content
}
