const { name, version, author, description } = require('../package.json')

module.exports = function (app) {
  // 更路径下返回项目信息
  app.get('/', function (req, res) {
    res.status(200).json({
      name,
      version,
      author,
      description
    })
  })

  // 查询湘大校园相关数据
  app.use('/xtu/v1', require('./xtu'))
}