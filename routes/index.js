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

  app.use('/v1', require('./v1/index'))
  app.use('/v1', require('./v1/trend'))
}