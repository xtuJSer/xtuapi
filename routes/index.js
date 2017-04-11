const { name, version, author, description } = require('../package.json')

module.exports = function (app) {
  // 根路径下返回项目信息
  app.get('/', function (req, res) {
    res.status(200).json({
      name,
      version,
      author,
      description
    })
  })

  // v1 路径下返回功能信息
  app.use('/v1', require('./v1/index'))
  app.use('/v1', require('./v1/trend'))
  app.use('/v1', require('./v1/user'))
  app.get('*', (req, res) => {
    res.status(404).send('您所访问的资源不存在, 请查阅相关文档')
  })
}