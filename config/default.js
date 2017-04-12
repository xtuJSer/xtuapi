module.exports = {
  port: 3000,
  session: {
    secret: '2017 magicalLu',
    key: 'xtu',
    cookie: {
      maxAge: 1000 * 60 * 60 * 1
    },
    saveUninitialized: false,
    resave: true
  },
  cors: {
    origin: 'http://localhost:8000',
    headers: 'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, Cookie',
    credentials: true,
    methods: '*',
    'contentType': 'application/json;charset=utf-8'
  },
  mongodb: 'mongodb://localhost:27017/xtuApiLu',
  header: {
    // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    // 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    // 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
    // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:52.0) Gecko/20100101 Firefox/52.0',
    // 'User-Agent': "Mozilla/5.0 (Windows; U; Win98; zh-CN; rv:0.9.2) Gecko/20010725 Netscape6/6.1",
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,de;q=0.2,la;q=0.2'
  },
  spotImgOptions: {
    l: 'lu',
    binary: process.env.USER === 'weiwu'
      ? '/usr/local/bin/tesseract'
      : '/usr/bin/tesseract'
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
        verification: 'verifycode.servlet',     // 验证码
        course: 'kscj/cjcx_list?xq=',           // 成绩
        class: 'xskb/xskb_list.do',             // 课程表
        classroom: 'kbxx/kxjs_query',           // 空教室
        rank: 'kscj/cjjd_list'                  // 排名
      }
    }
  }
}