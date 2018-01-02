module.exports = {
  // 爬虫节流
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
      'nic', {
        host: 'http://nic.xtu.edu.cn',
        news: '/wangluodongtai/zhongxinxinwen',
        notice: '/wangluodongtai/tongzhigonggao'
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
      'xxxy', {
        host: 'http://xxxy.xtu.edu.cn',
        news: '/info.php?catalog=3',
        notice: '/info.php?catalog=4'
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
    ],
    [
      'wgyxy', {
        host: 'http://wgyxy.xtu.edu.cn',
        news: '/e/action/ListInfo/?classid=1',
        notice: '/e/action/ListInfo/?classid=5',
        lecture: '/e/action/ListInfo/?classid=24',
      }
    ]
  ],

  rules: {
    xtu: {
      default: {
        el: '.list',
        parent: 'a',
        child: 'span'
      }
    },
    nic: {
      default: {
        el: '.detail-main-list-ul',
        parent: 'li',
        child: 'span',
        prev: 'a'
      }
    },
    cie: {
      default: {
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
      // BUG: 不可用，12·28日后修复
      lecture: {
        charset: 'gbk',
        el: '.jobs-list',
        parent: '.list_xsr',
        prev: 'a',
        child: '.detail',
        specialTitle: '.hdtitle'
      }
    },
    xxxy: {
      default: {
        el: '.list1',
        parent: 'li',
        prev: 'a',
        child: 'span'
      }
    },
    hxxy: {
      default: {
        el: '#ctl00_ContentPlaceHolder1_GridView1',
        parent: 'tr',
        prev: 'a[id^=ctl00_ContentPlaceHolder1]',
        child: 'td'
      }
    },
    cem: {
      default: {
        charset: 'gbk',
        el: '.newslist',
        parent: 'li',
        prev: 'a',
        child: 'span'
      }
    },
    hgxy: {
      default: {
        charset: 'gbk',
        el: '.newslist2',
        parent: 'li',
        prev: 'a',
        child: 'span'
      }
    },
    law: {
      default: {
        charset: 'gbk',
        el: '.newslist',
        parent: 'li',
        prev: 'a',
        child: 'span'
      }
    },
    math: {
      default: {
        el: '#news',
        parent: '.node',
        prev: 'a'
      }
    },
    clxy: {
      default: {
        el: '.content_important',
        parent: 'li',
        prev: 'a',
        child: 'span'
      }
    },
    wgyxy: {
      default: {
        charset: 'gbk',
        el: '.newslist2',
        parent: 'li',
        prev: 'a',
        child: 'span'
      }
    }
  }
}
