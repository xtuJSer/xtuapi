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
      'cie', {
        host: 'http://cie.xtu.edu.cn',
        news: '/ciextu_new/zxdta',
        notice: '/ciextu_new/zzgga',
        lecture: '/ciextu_new/kxyj/kyxm'
      }
    ],
    [
      'business', {
        host: 'http://business.xtu.edu.cn',
        news: '/index.jsp?cd=news&ac=list&newsclass=xueyuanxw',
        notice: '/index.jsp?cd=news&ac=list&newsclass=tongzhigg',
        lecture: '/index.jsp?cd=xueshuhd&ac=list'
      }
    ],
    [
      'hxxy', {
        host: 'http://hxxy.web.xtu.edu.cn:8081',
        news: '/moreinfo.aspx?id=147',
        notice: '/moreinfo.aspx?id=112',
        lecture: '/moreinfo.aspx?id=97'
      }
    ],
    [
      'cem', {
        host: 'http://cem.xtu.edu.cn',
        news: '/e/action/ListInfo/?classid=1',
        notice: '/e/action/ListInfo/?classid=14',
        lecture: '/e/action/ListInfo/?classid=49'
      }
    ],
    [
      'hgxy', {
        host: 'http://hgxy.xtu.edu.cn',
        news: '/e/action/ListInfo/?classid=4',
        notice: '/e/action/ListInfo/?classid=12',
        lecture: '/e/action/ListInfo/?classid=14'
      }
    ],
    [
      'law', {
        host: 'http://law.xtu.edu.cn',
        news: '/infolist-7-0.html',
        notice: '/infolist-67-0.html',
        lecture: '/infolist-68-0.html'
      }
    ],
    [
      'math', {
        host: 'http://math.xtu.edu.cn',
        news: '/myphp/math/?q=last_node/news',
        notice: '/myphp/math/?q=last_node/notice',
        lecture: '/myphp/math/?q=last_node/chair'
      }
    ],
    [
      'clxy', {
        host: 'http://clxy.xtu.edu.cn',
        news: '/index.php/index/index/cate/id/61.html',
        notice: '/index.php/index/index/cate/id/78.html',
        lecture: '/index.php/index/index/cate/id/69.html'
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
    cie: {
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
    business: {
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
    hxxy: {
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
    cem: {
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
    hgxy: {
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
    },
    law: {
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
    math: {
      news: {
        el: '#news',
        parent: '.node',
        prev: 'a'
      },
      notice: {
        el: '#news',
        parent: '.node',
        prev: 'a'
      },
      lecture: {
        el: '#news',
        parent: '.node',
        prev: 'a'
      }
    },
    clxy: {
      news: {
        el: '.content_important',
        parent: 'li',
        prev: 'a',
        child: 'span'
      },
      notice: {
        el: '.content_important',
        parent: 'li',
        prev: 'a',
        child: 'span'
      },
      lecture: {
        el: '.content_important',
        parent: 'li',
        prev: 'a',
        child: 'span'
      }
    }
  }
}
