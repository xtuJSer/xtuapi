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
        info: '综合性全国重点大学，湖南省与教育部共建高校，湖南省与国家国防科工局共建高校。',
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
        info: ':)'
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
        info: '为学校师生员工提供强有力的后勤服务保障，努力构建有鲜明特色高水平现代大学的后勤服务保障体系。'
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
        info: '网络与信息管理中心是1997年5月成立的学校正处级直属单位。',
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
        info: '学院以培养合格人才为中心，以知识、能力和素质培养为主线，坚持“厚基础、宽口径、重应用，强能力”的培养目标。'
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
        info: '湘潭大学商学院前身为1975年成立的政治系。1981年经济学教研室从政治系分离成立经济系。'
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
        info: '湘潭大学兴湘学院是经教育部和湖南省人民政府批准设立，由湘潭大学举办的独立学院。'
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
        info: '化学学院成立于2001年，其前身为化学系。'
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
        info: '湘潭大学土木工程与力学学院的前身是流变力学研究所和建筑工程系。'
      }
    ],
    [
      'hgxy', {
        name: '化工院',
        host: 'http://hgxy.xtu.edu.cn',
        path: {
          news: '/plus/list.php?tid=43',
          notice: '/plus/list.php?tid=20'
        },
        info: '湘潭大学化工学院始创于1976年的化工机械系，是湘潭大学最早的理工科院系之一，2001年正式成立化工学院。'
      }
    ],
    [
      'law', {
        name: '法学院',
        host: 'http://law.xtu.edu.cn',
        path: {
          news: '/infolist-7-0.html',
          notice: '/infolist-67-0.html',
          lecture: '/infolist-68-0.html'
        },
        info: '湘潭大学法学专业创办于1982年，是湖南省创办最早的法学专业。湘潭大学法学院是湖南省师资力量最强、学科门类最全、招生规模最大、教育层次最齐全的法学院系之一。'
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
        info: '数学与计算科学学院是湘潭大学成立最早的院系之一，其前身是成立于1974年的数理系。'
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
        info: '致力于国家重大战略需求，以材料与力学学科交叉为特色，着重解决信息、能源、航空航天、探测技术等领域的材料设计、制备、性能与应用中的重大科学和工程化问题。'
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
        info: '湘潭大学外国语学院成立于2016年1月，其前身分别为湘潭大学外国语学院，湘潭大学大学英语教学部。'
      }
    ],
    [
      'zxx', {
        name: '哲学系',
        host: 'http://zxx.xtu.edu.cn',
        path: {
          news: '/e/action/ListInfo/?classid=42',
          notice: '/e/action/ListInfo/?classid=25',
          lecture: '/e/action/ListInfo/?classid=4',
        },
        info: '湘潭大学哲学系是与学校各二级学院平级的基础专业研究教学部门，创建于1979年，是湘潭大学最早建立的院系之一。'
      }
    ],
    [
      'lsx', {
        name: '历史系',
        host: 'http://lishixi.xtu.edu.cn',
        path: {
          news: '/info.php?catalog=21',
          notice: '/info.php?catalog=22'
        },
        info: '历史系是湘潭大学设置最早的二级教学单位之一。'
      }
    ],
    [
      'glxy', {
        name: '公共管理学院',
        host: 'http://glxy.xtu.edu.cn',
        path: {
          news: '/e/action/ListInfo/?classid=62',
          notice: '/e/action/ListInfo/?classid=63'
        },
        info: ' 湘潭大学公共管理学院成立于2007年，是在原来人文学院、信息管理系、管理学院相关专业和学科整合基础上发展而来的。'
      }
    ],
    [
      'zscqxy', {
        name: '知识产权学院',
        host: 'http://law.xtu.edu.cn',
        path: {
          news: '/infolist-81-0.html',
          notice: '/infolist-82-0.html'
        },
        info: '湘潭大学知识产权学院成立于2008年11月，与法学院合署办公，是湖南省首家也是惟一一家知识产权学院。'
      }
    ],
    [
      'xyfxgl', {
        name: '信用风险管理学院',
        host: 'http://xyfxgl.web.xtu.edu.cn:8081',
        path: {
          news: '/newchinld_list.aspx?category_id=63',
          notice: '/notice_list.aspx?category_id=70'
        },
        info: '湘潭大学信用风险管理学院成立于2017年5月，是由湘潭大学校友、长沙永雄股权投资管理有限公司董事长谭曼先生独资捐建的湘潭大学下设的二级学院，是全国首家信用风险管理学院。'
      }
    ],
    [
      'mks', {
        name: '马克思主义学院',
        host: 'http://mks.xtu.edu.cn',
        path: {
          news: '/e/action/ListInfo/?classid=1',
          notice: '/e/action/ListInfo/?classid=2',
          lecture: '/e/action/ListInfo/?classid=13'
        },
        info: '学院源于1975年湘大复校时设立的政治系。1978年成立马列主义教研室。2002年成立马克思主义学院。'
      }
    ],
    [
      'wlxy', {
        name: '物理与光电工程学院',
        host: 'http://wlxy.xtu.edu.cn',
        path: {
          news: '/slanmu.php?id=33',
          notice: '/slanmu.php?id=34'
        },
        info: '物理与光电工程学院起源于湘潭大学1976年成立的数理系，2014年9月更名为物理与光电工程学院。'
      }
    ],
    [
      'jxgc', {
        name: '机械工程学院',
        host: 'http://jxgc.xtu.edu.cn',
        path: {
          news: '/e/action/ListInfo/?classid=23',
          notice: '/e/action/ListInfo/?classid=24',
          lecture: '/e/action/ListInfo/?classid=38'
        },
        info: '我校1958年建校时即开设机械专业，1974学校恢复招生时设立化工机械系，为全校仅有的两个教学机构之一；1980年成立机械工程系；1998年9月成立机械工程学院。'
      }
    ],
    [
      'hjzy', {
        name: '环境与资源学院',
        host: 'http://hjzy.xtu.edu.cn',
        path: {
          news: '/e/action/ListInfo/?classid=30',
          notice: '/e/action/ListInfo/?classid=35'
        },
        info: '湘潭大学环境与资源学院成立于2016年5月，由环境科学与工程、采矿工程与安全工程学科组建成立（以下简称环资学院），目前设立环境系与资源系两个系。'
      }
    ],
    [
      'tyb', {
        name: '体育教学部',
        host: 'http://tyb.xtu.edu.cn',
        path: {
          news: '/news',
          notice: '/notices'
        },
        info: '湘潭大学体育教学部是直属主管校长领导下的学校二级教学单位，也是学校体育运动委员会的执行机构。'
      }
    ],
    [
      'art', {
        name: '艺术学院',
        host: 'http://art.xtu.edu.cn',
        path: {
          news: '/index/schooltrends',
          notice: '/index/one_content?type=list&mytype=tztg&k_page=noselect',
          lecture: '/index/one_content?type=list&mytype=zljz&k_page=noselect'
        },
        info: '湘潭大学艺术学院现有教授7人（含客座教授）、副教授6人（含客座教授），博士及在读博士4人，硕士28人，有视觉传达设计、艺术设计学和动画等3个本科专业，有“艺术理论与实践”科学硕士点和“艺术硕士专业学位点”（MFA）各一个。'
      }
    ],
    [
      'gjjl', {
        name: '国际交流学院',
        host: 'http://gjjl.xtu.edu.cn',
        path: {
          news: '/info.php?catalog=22',
          notice: '/info.php?catalog=23'
        },
        info: '湘潭大学国际交流学院，依托湘潭大学优秀的教学资源，是以招收外国留学生和输送中国学生留学并开设国际联合培养课程，与英国、法国、西班牙多所名校联合培养高层次、国际型专门人才的中外合作学院。'
      }
    ],
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
        func: (dom) => {
          const monthAndDate = dom.find('.list-news-time').children('span').text()
          const year = dom.find('.list-news-time').contents().filter(function() {
            return this.nodeType === 3
          }).text().trim()

          return {
            title: dom.find('.list-news-nr').children('span').text(),
            href: dom.attr('href'),
            time: year + '-' + monthAndDate
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
    },
    zxx: {
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
    lsx: {
      default: {
        el: '.lst3',
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
    glxy: {
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
    zscqxy: {
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
    xyfxgl: {
      default: {
        el: '.page-list',
        parent: 'li',
        func: (dom) => {
          const $a = dom.find('a').eq(0)
          const time = dom.find('.title_remarks').eq(0).text().split(' ')[0]

          return {
            title: $a.text(),
            href: $a.attr('href'),
            time
          }
        }
      }
    },
    mks: {
      default: {
        charset: 'gbk',
        el: '.list',
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
    wlxy: {
      default: {
        el: '.newsmain',
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
    jxgc: {
      default: {
        charset: 'gbk',
        el: '.list-news',
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
    hjzy: {
      default: {
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
    tyb: {
      default: {
        charset: 'gbk',
        el: '.news_list table table',
        parent: 'tr',
        time: 'td[align="right"]',
        func: (dom) => {
          const $a = dom.find('a').eq(0)

          return {
            title: $a.text(),
            href: $a.attr('href')
          }
        }
      }
    },
    art: {
      default: {
        el: '.list_part',
        parent: 'li',
        time: '.list_item_date',
        func: (dom) => {
          const $a = dom.find('.list_item a').eq(0)

          if (!$a.attr('onclick')) {
            return {}
          }

          return {
            title: dom.find('.list_item_title').text(),
            href: $a.attr('onclick').replace(/.*\(\'(.*)\'\)/g, (str, $1) => $1)
          }
        }
      },
      news: {
        el: '.school_trends_1',
        parent: '.trend',
        time: '.right_top',
        func: (dom) => {
          const $a = dom.find('.intro a').eq(0)

          return {
            title: $a.text(),
            href: $a.attr('href')
          }
        }
      }
    },
    gjjl: {
      default: {
        el: '.list1 .cl1',
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
  }
}
