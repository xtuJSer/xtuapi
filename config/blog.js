module.exports = {
  throttle: 5 * 1000 * 60,

  scopes: [
    [
      'xtu', {
        host: 'http://www.xtu.edu.cn',
        news: '/xdxw/xnxw',
        lecture: '/xysh/xywh/xsjz',
        notice: '/gonggao'
      }
    ],
    [
      'xg', {
        host: 'http://cie.xtu.edu.cn',
        news: '/ciextu_new/zxdta',
        notice: '/ciextu_new/zzgga',
        lecture: '/ciextu_new/kxyj/kyxm'
      }
    ],
    [
      's', {
        host: 'http://business.xtu.edu.cn',
        news: '/index.jsp?cd=news&ac=list&newsclass=xueyuanxw',
        notice: '/index.jsp?cd=news&ac=list&newsclass=tongzhigg',
        lecture: '/index.jsp?cd=xueshuhd&ac=list'
      }
    ],
    [
      'hx', {
        host: 'http://hxxy.web.xtu.edu.cn:8081',
        news: '/moreinfo.aspx?id=147',
        notice: '/moreinfo.aspx?id=112',
        lecture: '/moreinfo.aspx?id=97'
      }
    ],
    [
      'tm', {
        host: 'http://cem.xtu.edu.cn',
        news: '/e/action/ListInfo/?classid=1',
        notice: '/e/action/ListInfo/?classid=14',
        lecture: '/e/action/ListInfo/?classid=49'
      }
    ],
    [
      'hg', {
        host: 'http://hgxy.xtu.edu.cn',
        news: '/e/action/ListInfo/?classid=4',
        notice: '/e/action/ListInfo/?classid=12',
        lecture: '/e/action/ListInfo/?classid=14'
      }
    ]
  ],

  rules: {
    xtu: {
      news: {
        el: '.list',
        parent: 'a',
        child: 'span'
      },
      notice: {
        el: '.list',
        parent: 'a',
        child: 'span'
      },
      lecture: {
        el: '.list',
        parent: 'a',
        child: 'span'
      }
    },
    xg: {
      news: {
        el: '#show-page',
        parent: 'a',
        child: 'span'
      },
      notice: {
        el: '#show-page',
        parent: 'a',
        child: 'span'
      },
      lecture: {
        el: '#show-page',
        parent: 'a',
        child: 'span'
      }
    },
    s: {
      news: {
        charset: 'gbk',
        el: '#xueyuanxw',
        parent: 'li',
        prev: 'a',
        child: 'span'
      },
      notice: {
        charset: 'gbk',
        el: '#tongzhigg',
        parent: 'li',
        prev: 'a',
        child: 'span'
      },
      lecture: {
        charset: 'gbk',
        el: '.jobs-list',
        parent: '.list_xsr',
        prev: 'a',
        child: '.detail',
        specialTitle: '.hdtitle'
      }
    },
    hx: {
      news: {
        el: '#ctl00_ContentPlaceHolder1_GridView1',
        parent: 'tr',
        prev: 'td font>a',
        child: 'td font'
      },
      notice: {
        el: '#ctl00_ContentPlaceHolder1_GridView1',
        parent: 'tr',
        prev: 'td font>a',
        child: 'td font'
      },
      lecture: {
        el: '#ctl00_ContentPlaceHolder1_GridView1',
        parent: 'tr',
        prev: 'td font>a',
        child: 'td font'
      }
    },
    tm: {
      news: {
        charset: 'gbk',
        el: '.newslist',
        parent: 'li',
        prev: 'a',
        child: 'span'
      },
      notice: {
        charset: 'gbk',
        el: '.newslist',
        parent: 'li',
        prev: 'a',
        child: 'span'
      },
      lecture: {
        charset: 'gbk',
        el: '.newslist',
        parent: 'li',
        prev: 'a',
        child: 'span'
      }
    },
    hg: {
      news: {
        charset: 'gbk',
        el: '.newslist2',
        parent: 'li',
        prev: 'a',
        child: 'span'
      },
      notice: {
        charset: 'gbk',
        el: '.newslist2',
        parent: 'li',
        prev: 'a',
        child: 'span'
      },
      lecture: {
        charset: 'gbk',
        el: '.newslist2',
        parent: 'li',
        prev: 'a',
        child: 'span'
      }
    }
  }
}
