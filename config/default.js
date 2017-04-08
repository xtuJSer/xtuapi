module.exports = {
  port: 3000,
  session: {
    secret: 'magicalLu',
    key: 'xtuApiLu',
    maxAge: 1000 * 60 * 60 * 24
  },
  mongodb: 'mongodb://localhost:27017/xtuapilu',
  xtuUrl: {
    trend: {
      host: 'http://www.xtu.edu.cn/',
      path: {
        news: 'xdxw/xnxw/',             // 新闻
        cathedra: 'xysh/xywh/xsjz/',    // 讲座
        notice: 'gonggao/',             // 公告
        media: 'html/meitixd/'          // 媒体
      }
    }
  }
}