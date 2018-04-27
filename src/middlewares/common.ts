/**
 * 请求相关
 */
export const request = async (ctx, next) => {
  mountToData(ctx)
  trimRequest(ctx)

  await next()
}

/**
 * 挂载 ctx.request.body -> ctx.data
 */
export const mountToData = (ctx) => {
  const { request: { body = {} } } = ctx

  ctx.data = body
}

/**
 * 清空请求数据的前后空格
 */
export const trimRequest = (ctx) => {
  const { data, query } = ctx

  for (let key in data) {
    if (typeof data[key] === 'string') {
      data[key] = data[key].trim()
    }
  }
  for (let key in query) {
    if (typeof query[key] === 'string') {
      query[key] = query[key].trim()
    }
  }
}

/**
 * 打印请求记录
 */
export const log = async (ctx, next) => {
  const start = Date.now()

  await next()
  const ms = Date.now() - start

  process.env.NODE_ENV === 'test' || console.log(`${ctx.method} ${ctx.url} ${JSON.stringify(ctx.data)} ${ms}ms`)
}

export const handleError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = err.message
  }
}
