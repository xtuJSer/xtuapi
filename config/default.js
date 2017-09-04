module.exports = {
  port: 3000,

  defaultYear: '2016',
  defaultHalf: '2',

  session: {
    name: 'xtuUser',
    secret: '2017 magicalLu',
    saveUninitialized: false,
    resave: true,
    secure: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
      // domain: 'magicallu.cn',
      // path: '/'，
    }
  },

  cors: {
    origin: [
      'http://localhost:8000',
      'http://localhost:8888',
      'http://localhost:8080',
      'http://localhost:8808',
      'http://xtutx.magicallu.cn',
      'https://free.magicallu.cn',
      'https://trend.magicallu.cn',
      'https://classroom.magicallu.cn'
    ],
    headers: 'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, Cookie',
    credentials: true,
    methods: '*',
    maxAge: 60,
    contentType: 'application/json; charset=utf-8'
  },

  db: 'mongodb://localhost:27017/xtuApiLu',

  header: {
    'User-Agent': require('./userAgent'),
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,de;q=0.2,la;q=0.2'
  },

  spotImgOptions: {
    l: 'lu',
    binary: process.env.USER === 'weiwu'
      ? '/usr/local/bin/tesseract'
      : '/usr/bin/tesseract'
  },

  xtuURL: {
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
        klass: 'xskb/xskb_list.do',             // 课程表
        classroom: 'kbxx/kxjs_query',           // 空教室
        rank: 'kscj/cjjd_list',                 // 排名
        info: 'grxx/xsxx',                      // 用户信息（仅抓取姓名拼音和性别）
        exam: 'xsks/xsksap_list'                // 考试安排
      }
    },
    library: {
      host: 'http://202.197.232.4:8081/opac_two/',
      path: {
        login: 'include/login_app.jsp',
        book: 'reader/jieshuxinxi.jsp'
      }
    },
    card: {
      host: 'http://ecard.xtu.edu.cn/',
      path: {
        login: 'loginstudent.action',
        verification: 'homeLogin.action/getCheckpic.action?rand=0'
      }
    }
  }
}
