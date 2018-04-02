export default {
  // 爬虫节流
  throttle: 5 * 60 * 1000,

  scopes: [
    [
      'xtu', {
        name: '湘潭大学',
        host: 'http://www.xtu.edu.cn',
        path: {
          news: '/xdxw/xnxw',
          lecture: '/xysh/xywh/xsjz',
          notice: '/gonggao'
        },
        info: '综合性全国重点大学，湖南省与教育部共建高校，湖南省与国家国防科工局共建高校',
      }
    ],
    [
      'nic', {
        name: '网络与信息管理中心',
        host: 'http://nic.xtu.edu.cn',
        path: {
          news: '/wangluodongtai/zhongxinxinwen',
          notice: '/wangluodongtai/tongzhigonggao'
        },
        info: '网络与信息管理中心是1997年5月成立的学校正处级直属单位',
      }
    ],
    [
      'cie', {
        name: '信息工程学院',
        host: 'http://cie.xtu.edu.cn',
        path: {
          news: '/ciextu_new/zxdta',
          notice: '/ciextu_new/zzgga',
          lecture: '/ciextu_new/kxyj/kyxm'
        },
        info: '学院以培养合格人才为中心，以知识、能力和素质培养为主线，坚持“厚基础、宽口径、重应用，强能力”的培养目标'
      }
    ],
    [
      'business', {
        name: '商学院',
        host: 'http://business.xtu.edu.cn',
        path: {
          news: '/index.jsp?cd=news&ac=list&newsclass=xueyuanxw',
          notice: '/index.jsp?cd=news&ac=list&newsclass=tongzhigg',
          lecture: '/index.jsp?cd=xueshuhd&ac=list'
        },
        info: '湘潭大学商学院前身为1975年成立的政治系。1981年经济学教研室从政治系分离成立经济系'
      }
    ],
    [
      'xxxy', {
        name: '兴湘学院',
        host: 'http://xxxy.xtu.edu.cn',
        path: {
          news: '/info.php?catalog=3',
          notice: '/info.php?catalog=4'
        },
        info: '湘潭大学兴湘学院是经教育部和湖南省人民政府批准设立，由湘潭大学举办的独立学院'
      }
    ],
    [
      'hxxy', {
        name: '化学学院',
        host: 'http://hxxy.web.xtu.edu.cn:8081',
        path: {
          news: '/moreinfo.aspx?id=147',
          notice: '/moreinfo.aspx?id=112',
          lecture: '/moreinfo.aspx?id=97'
        },
        info: '化学学院成立于2001年，其前身为化学系'
      }
    ],
    [
      'cem', {
        name: '土木工程与力学学院',
        host: 'http://cem.xtu.edu.cn',
        path: {
          news: '/e/action/ListInfo/?classid=1',
          notice: '/e/action/ListInfo/?classid=14',
          lecture: '/e/action/ListInfo/?classid=49'
        },
        info: '湘潭大学土木工程与力学学院的前身是流变力学研究所和建筑工程系'
      }
    ],
    // [
    //   'hgxy', {
    //     name: '化工院',
    //     host: 'http://hgxy.xtu.edu.cn',
    //       path: {
    //         news: '/plus/list.php?tid=43',
    //         notice: '/plus/list.php?tid=20'
    //         // lecture: '/e/action/ListInfo/?classid=14'
    //       }
    //   }
    // ],
    [
      'law', {
        name: '法学院',
        host: 'http://law.xtu.edu.cn',
        path: {
          news: '/infolist-7-0.html',
          notice: '/infolist-67-0.html',
          lecture: '/infolist-68-0.html'
        },
        info: '湘潭大学法学专业创办于1982年，是湖南省创办最早的法学专业。湘潭大学法学院是湖南省师资力量最强、学科门类最全、招生规模最大、教育层次最齐全的法学院系之一'
      }
    ],
    [
      'math', {
        name: '数学与计算科学学院',
        host: 'http://math.xtu.edu.cn',
        path: {
          news: '/t3.html',
          notice: '/t2.html',
          lecture: '/t1.html'
        },
        info: '数学与计算科学学院是湘潭大学成立最早的院系之一，其前身是成立于1974年的数理系'
      }
    ],
    [
      'clxy', {
        name: '材料科学与工程学院',
        host: 'http://clxy.xtu.edu.cn',
        path: {
          news: '/index.php/index/index/cate/id/61.html',
          notice: '/index.php/index/index/cate/id/78.html',
          lecture: '/index.php/index/index/cate/id/69.html'
        },
        info: '致力于国家重大战略需求，以材料与力学学科交叉为特色，着重解决信息、能源、航空航天、探测技术等领域的材料设计、制备、性能与应用中的重大科学和工程化问题'
      }
    ],
    [
      'wgyxy', {
        name: '外国语学院',
        host: 'http://wgyxy.xtu.edu.cn',
        path: {
          news: '/e/action/ListInfo/?classid=1',
          notice: '/e/action/ListInfo/?classid=5',
          lecture: '/e/action/ListInfo/?classid=24',
        },
        info: '湘潭大学外国语学院成立于2016年1月，其前身分别为湘潭大学外国语学院，湘潭大学大学英语教学部'
      }
    ],
    [
      'jwc', {
        name: '教务处',
        host: 'http://jwc.xtu.edu.cn/',
        path: {
          news: '/e/action/ListInfo/?classid=1',
          notice: 'e/action/ListInfo/?classid=2'
        },
        info: ''
      }
    ],
    [
      'hqbzc', {
        name: '后勤保障处',
        host: 'http://hqbzc.xtu.edu.cn/',
        path: {
          news: 'index.php/index-index-cate-id-14.html',
          notice: 'index.php/index-index-cate-id-15.html'
        },
        info: '为学校师生员工提供强有力的后勤服务保障，努力构建有鲜明特色高水平现代大学的后勤服务保障体系'
      }
    ]
  ],

  rules: {
    xtu: {
      default: {
        el: '.list',
        parent: 'a',
        time: 'span',
        func: (dom) => {
          return {
            title: dom.attr('title'),
            href: dom.attr('href')
          }
        }
      }
    },
    nic: {
      default: {
        el: '.detail-main-list-ul',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.children('a').eq(0)

          return {
            title: $a.text(),
            href: $a.attr('href')
          }
        }
      }
    },
    cie: {
      default: {
        el: '#show-page',
        parent: 'a',
        time: 'span',
        func: (dom) => {
          return {
            title: dom.contents().filter(function() {
              return this.nodeType === 3
            }).text(),
            href: dom.attr('href')
          }
        }
      }
    },
    business: {
      news: {
        charset: 'gbk',
        el: '#xueyuanxw',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.children('a').eq(0)

          return {
            title: $a.attr('title'),
            href: $a.attr('href')
          }
        }
      },
      notice: {
        charset: 'gbk',
        el: '#tongzhigg',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.children('a').eq(0)

          return {
            title: $a.attr('title'),
            href: $a.attr('href')
          }
        }
      },
      lecture: {
        charset: 'gbk',
        el: '.jobs-list',
        parent: '.list_xsr > a',
        time: '.detail',
        func: (dom) => {
          return {
            title: dom.find('.hdtitle').text(),
            href: dom.attr('href')
          }
        }
      }
    },
    xxxy: {
      default: {
        el: '.list1',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.children('a').eq(0)

          return {
            title: $a.text(),
            href: $a.attr('href')
          }
        }
      }
    },
    hxxy: {
      default: {
        el: '#ctl00_ContentPlaceHolder1_GridView1',
        parent: 'tr',
        // prev: 'a[id^=ctl00_ContentPlaceHolder1]',
        time: 'td',
        func: (dom) => {
          const $a = dom.find('a').eq(0)

          return {
            title: $a.attr('title'),
            href: $a.attr('href')
          }
        }
      }
    },
    cem: {
      default: {
        charset: 'gbk',
        el: '.newslist',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.find('a').eq(0)

          return {
            title: $a.attr('title'),
            href: $a.attr('href')
          }
        }
      }
    },
    hgxy: {
      default: {
        el: '.list-news',
        parent: 'a',
        time: '.list-news-time',
        func: (dom) => {
          // TODO: time

          return {
            title: dom.find('.list-news-nr').children('span').text(),
            href: dom.attr('href')
          }
        }
      }
    },
    law: {
      default: {
        charset: 'gbk',
        el: '.newslist',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.find('a').eq(0)

          return {
            title: $a.attr('title'),
            href: $a.attr('href')
          }
        }
      }
    },
    math: {
      default: {
        el: '.leftbar-list',
        parent: 'a',
        func: (dom) => {
          // 根据 _id 排序

          return {
            title: dom.attr('title'),
            href: dom.attr('href')
          }
        }
      }
    },
    clxy: {
      default: {
        el: '.content_important',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.find('a').eq(0)

          return {
            title: $a.text(),
            href: $a.attr('href')
          }
        }
      }
    },
    wgyxy: {
      default: {
        charset: 'gbk',
        el: '.newslist2',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.find('a').eq(0)

          return {
            title: $a.attr('title'),
            href: $a.attr('href')
          }
        }
      }
    },
    jwc: {
      default: {
        charset: 'gbk',
        el: '.articleList',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.find('a').eq(0)

          return {
            title: $a.attr('title'),
            href: $a.attr('href')
          }
        }
      }
    },
    hqbzc: {
      default: {
        el: '.content_important',
        parent: 'li',
        time: 'span',
        func: (dom) => {
          const $a = dom.find('a').eq(0)

          return {
            title: $a.text(),
            href: $a.attr('href')
          }
        }
      }
    }
  }
}
