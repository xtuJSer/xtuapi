const pkg = { name, version, author, description } = require('../package.json')
const routes = ['/trend', '/user', '/library', '/card']

module.exports = function (app) {
  // 根路径下返回项目信息
  app.get('/', function (req, res) {
    res.status(200).json({
      ...pkg,
      '使用文档': 'https://github.com/xtuJSer/xtuapi'
    })
  })

  // 子路由
  routes.map(route => app.use(route, require(`.${route}`)))

  app.get('*', (req, res) => {
    res.status(404).send('您所访问的资源不存在, 请查阅相关文档')
  })
}
