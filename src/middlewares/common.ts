export const log = async (ctx, next) => {
  const start = Date.now()

  await next()
  const ms = Date.now() - start

  console.log(`${ctx.method} ${ctx.url} params: ${JSON.stringify(ctx.params)} ${ms}ms\n`)
}
