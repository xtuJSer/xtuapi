// const

module.exports = async (options) => {
  const { url } = options

  // TODO:
  // 通过 url 发起爬取请求，获取数据后并返回（使用节流，限定时间内不再使用爬虫）
  // 比对数据，将新数据依照 scope 和 topic 存入数据库
  // 最后根据 limit 和 cursor++ 返回数据（当限定时间内再次收到同一 scope 和 topic 的请求则只执行该步骤）

  return {
    url
  }
}
