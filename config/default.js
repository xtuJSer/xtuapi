module.exports = {
  port: 3000,
  session: {
    secret: 'magicalLu',
    key: 'xtuApiLu',
    cookie: {
      maxAge: 1000 * 60 * 60 * 1
    },
    saveUninitialized: true,
    resave: true
  },
  mongodb: 'mongodb://localhost:27017/xtuApiLu',
  header: {
    // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    // 'User-Agent': "Mozilla/5.0 (Windows; U; Win98; zh-CN; rv:0.9.2) Gecko/20010725 Netscape6/6.1",
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,de;q=0.2,la;q=0.2'
  },
  spotImgOptions: {
    l: 'lu',
    // binary: '/usr/bin/tesseract' // centos
    binary: '/usr/local/bin/tesseract' // mac
  },
  xtuUrl: {
    trend: {
      host: 'http://www.xtu.edu.cn/',
      path: {
        news: 'xdxw/xnxw/',             // 新闻
        cathedra: 'xysh/xywh/xsjz/',    // 讲座
        notice: 'gonggao/',             // 公告
        media: 'html/meitixd/'          // 媒体
      }
    },
    user: {
      host: 'http://jwxt.xtu.edu.cn/jsxsd/',    // 登录界面
      path: {
        login: 'xk/LoginToXk',                  // 登录接口
        verification: 'verifycode.servlet'      // 验证码
      }
    }
  }
}