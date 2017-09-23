module.exports = {
  url: {
    host: 'http://jwxt.xtu.edu.cn/jsxsd',
    path: {
      login: '/xk/LoginToXk',
      verification: '/verifycode.servlet',
      course: '/kscj/cjcx_list?xq=',
      schedule: '/xskb/xskb_list.do',
      classroom: '/kbxx/kxjs_query',
      rank: '/kscj/cjjd_list',
      info: '/grxx/xsxx',
      exam: '/xsks/xsksap_list'
    }
  },

  spotImgOptions: {
    l: 'lu',
    binary: process.env.NODE_ENV === 'dev'
      ? '/usr/local/bin/tesseract'
      : '/usr/bin/tesseract'
  },

  headers: {
    'User-Agent': require('./userAgent'),
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,de;q=0.2,la;q=0.2'
  }
}
