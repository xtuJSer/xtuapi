module.exports = {
  scopes: [
    [
      // 湘潭大学本部
      'xtu', {
        host: 'http://www.xtu.edu.cn',
        news: '/xdxw/xnxw',
        lecture: '/xysh/xywh/xsjz',
        notice: '/gonggao',
        media: '/html/meitixd'
      }
    ],
    [
      // 信息工程学院
      'xg', {
        host: 'http://cie.xtu.edu.cn/ciextu_new',
        news: '/zxdta',
        notice: '/zzgga',
        lecture: '/kxyj/kyxm'
      }
    ],
    [
      // 商学院
      's', {
        host: 'http://business.xtu.edu.cn',
        news: '/index.jsp?cd=news&ac=list&newsclass=xueyuanxw',
        notice: '/index.jsp?cd=news&ac=list&newsclass=tongzhigg',
        lecture: '/index.jsp?cd=xueshuhd&ac=list'
      }
    ],
    [
      // 化工学院
      'hg', {
        host: 'http://hxxy.web.xtu.edu.cn:8081',
        news: '/moreinfo.aspx?id=147',
        notice: '/moreinfo.aspx?id=112',
        lecture: '/moreinfo.aspx?id=97'
      }
    ]
  ]
}
