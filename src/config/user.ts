export default {
  defaultTime: {
    year: 2017,
    half: 2
  },

  url: {
    host: 'http://jwxt.xtu.edu.cn/jsxsd',
    path: {
      login: '/xk/LoginToXk',
      encoded: '?flag=sess',
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
    binary: /(dev|test)/.test(process.env.NODE_ENV)
      ? '/usr/local/bin/tesseract'
      : '/usr/bin/tesseract'
  }
}
