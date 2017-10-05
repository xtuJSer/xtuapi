module.exports = {
  defaultTime: {
    year: 2016,
    half: 2
  },

  url: {
    host: 'http://jwxt.xtu.edu.cn/jsxsd',
    path: {
      login: '/xk/LoginToXk',
      verification: '/verifycode.servlet',
      course: '/kscj/cjcx_list?xq=',
      schedule: '/xskb/xskb_list.do',
      classroom: '/kbxx/kxjs_query',
      rank: '/kscj/cjjd_list',
      blog: '/grxx/xsxx',
      exam: '/xsks/xsksap_list'
    }
  },

  spotImgOptions: {
    l: 'lu',
    binary: process.env.NODE_ENV === 'dev'
      ? '/usr/local/bin/tesseract'
      : '/usr/bin/tesseract'
  }
}
