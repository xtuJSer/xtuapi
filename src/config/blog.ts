export default {
  // 爬虫节流
  throttle: 5 * 1000 * 60,

  dict: {
    xtu: '湘大本部',
    business: '商学院',
    cie: '信工院',
    // hgxy: '化工院',
    hxxy: '化学院',
    cem: '土木院',
    law: '法学院',
    math: '数学院',
    clxy: '材料院',
    wgyxy: '外国语学院',
    xxxy: '兴湘学院',
    nic: '网络信息管理'
  },

  info: {
    xtu: '综合性全国重点大学，湖南省与教育部共建高校，湖南省与国家国防科工局共建高校',
    nic: '网络与信息管理中心是1997年5月成立的学校正处级直属单位',
    cie: '学院以培养合格人才为中心，以知识、能力和素质培养为主线，坚持“厚基础、宽口径、重应用，强能力”的培养目标',
    business: '湘潭大学商学院前身为1975年成立的政治系。1981年经济学教研室从政治系分离成立经济系。1985年，经省人民政府批准，在经济系中分出部分专门从事消费经济研究的老师，成立消费经济研究所。1993年，经湖南省人民政府批准，经济系与消费经济研究所合并，成立国际经贸管理学院。2001年，国际经贸管理学院改名为商学院',
    xxxy: '湘潭大学兴湘学院是经教育部和湖南省人民政府批准设立，由湘潭大学举办的独立学院',
    hxxy: '化学学院成立于2001年，其前身为化学系',
    cem: '湘潭大学土木工程与力学学院的前身是流变力学研究所和建筑工程系',
    law: '湘潭大学法学专业创办于1982年，是湖南省创办最早的法学专业。湘潭大学法学院是湖南省师资力量最强、学科门类最全、招生规模最大、教育层次最齐全的法学院系之一',
    math: '',
    clxy: '致力于国家重大战略需求，以材料与力学学科交叉为特色，着重解决信息、能源、航空航天、探测技术等领域的材料设计、制备、性能与应用中的重大科学和工程化问题',
    wgyxy: '湘潭大学外国语学院成立于2016年1月，其前身分别为湘潭大学外国语学院，湘潭大学大学英语教学部'
  },

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
    // [
    //   'hgxy', {
    //     host: 'http://hgxy.xtu.edu.cn',
    //     news: '/e/action/ListInfo/?classid=4',
    //     notice: '/e/action/ListInfo/?classid=12',
    //     lecture: '/e/action/ListInfo/?classid=14'
    //   }
    // ],
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
