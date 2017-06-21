const { name, version, author, description } = require('../package.json')

module.exports = function (app) {
  // 根路径下返回项目信息
  app.get('/', function (req, res) {
    res.status(200).json({
      name,
      version,
      author,
      description,
      '使用文档': 'https://github.com/ww522413622/xtuApiLu'
    })
  })

  app.use('/trend', require('./trend'))
  app.use('/user', require('./user'))
  app.use('/library', require('./library'))

  app.get('*', (req, res) => {
    res.status(404).send('您所访问的资源不存在, 请查阅相关文档')
  })
}
