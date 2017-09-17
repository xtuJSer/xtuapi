// const

module.exports = async (options) => {
  const { url, scope, topic, limit, cursor } = options

  // TODO:
  // 1. 通过 scope 和 topic 取出该数据集中的第一个数据（使用节流，限定时间内不再使用爬虫，1~3 为数据确认和更新）
  // 2. 向 url 发起爬取请求，在获取数据的过程中，比对第一步中的数据，若一致则立刻终止并返回已获取的新数据
  // 3. 比对数据，将新数据依照 scope 和 topic 存入数据库
  // 4. 最后根据 limit 和 cursor += limit 返回数据（当限定时间内再次收到同一 scope 和 topic 的请求则只执行该步骤）

  return { url, scope, topic, limit, cursor }
}
