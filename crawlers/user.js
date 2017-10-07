const request = require('superagent')
require('superagent-charset')(request)
const Eventproxy = require('eventproxy')

const {
  url: { host, path: routes },
  defaultTime: { year: defaultYear, half: defaultHalf }
} = require('../config').user

const {
  userBlogFilter,
  userCourseFilter,
  userExamFilter,
  userScheduleFilter,
  userRankFilter
} = require('../filters').user

/**
 * 返回完整的年份和学期
 * @param {String} param0 学年，如：2016-2017-2
 */
const _getFullTime = ({ year, half }) => year + '-' + (+year + 1) + '-' + half

/**
 * 统一的爬取逻辑（除 rank）
 * @param {Object} filter 过滤后的结果
 */
const _fetch = filter => ({ type = 'get', href, sid, data = '' }, options = {}) =>
  new Promise((resolve, reject) => {
    const { updateHeaders } = require('../utils').headers
    const headers = updateHeaders()

    request[type](href)
      .set(headers)
      .set('Cookie', sid)
      .send(data)
      .charset('utf-8')
      .end((err, sres) => {
        err ? reject(err) : resolve(
          filter({ html: sres.text, ...options })
        )
      })
  })

/**
 * 信息
 * @param {Object} param0 userBlog
 */
const userBlogCrawler = async ({ sid }) => {
  const href = host + routes.blog
  const ret = await _fetch(userBlogFilter)({ href, sid })

  return ret
}

/**
 * 成绩
 * @param {Object} param0 userCourse
 */
const userCourseCrawler = async ({ sid, body }) => {
  const {
    time = (defaultYear + '-' + defaultHalf)
  } = body

  const fullTime = _getFullTime({
    year: time.split('-')[0],
    half: time.split('-')[1]
  })

  const href = host + routes.course

  const ret = await _fetch(userCourseFilter)(
    { href: href + fullTime, sid },
    { time: fullTime }
  )

  return ret
}

/**
 * 考试信息
 * @param {Object} param0 userExam
 */
const userExamCrawler = async ({ sid }) => {
  const href = host + routes.exam
  const data = `xqlbmc=&xnxqid=${defaultYear}-${defaultHalf}&xqlb=`

  const ret = await _fetch(userExamFilter)(
    { type: 'post', sid, data, href }
  )

  return ret
}

/**
 * 课程表
 * @param {Object} param0 userSchedule
 */
const userScheduleCrawler = async ({ sid }) => {
  const href = host + routes.schedule
  const data = `cj0701id=&zc=&demo=&xnxq01id=${defaultYear}-${defaultYear + 1}-${defaultHalf}&sfFD=1`

  const ret = await _fetch(userScheduleFilter)(
    { type: 'post', sid, data, href }
  )

  return ret
}

/**
 * 绩点排名
 * @param {Object} param0 userRank
 */
const userRankCrawler = async ({ sid, body }) => new Promise((resolve, reject) => {
  const href = host + routes.rank
  const prop = ['all', '7', '1']
  const defaultTime = defaultYear + '-' + defaultHalf
  let { time = defaultTime } = body
  let year = ''

  if (time.includes('&')) {
    time = time.split('&').map(el => _getFullTime({
      year: el.split('-')[0],
      half: el.split('-')[1]
    }))
    year = time.reduce((a, b) => a + '&kksj=' + b)
  } else {
    year = time = _getFullTime({
      year: time.split('-')[0],
      half: time.split('-')[1]
    })
  }

  const ep = new Eventproxy()

  ep.after('getHtml', prop.length, (htmlArr) => {
    const result = {
      rank: [],
      time
    }

    result.rank = htmlArr.map((htmlObj) => userRankFilter(htmlObj))
    resolve(result)
  })

  prop.map((propEl, pid) => {
    const data = `kksj=${year}&kclb=${propEl = propEl !== 'all' ? propEl : '1&kclb=7'}&zsb=0`

    request
      .post(href)
      .set('Cookie', sid)
      .send(data)
      .end((err, sres) => {
        err ? reject(err) : ep.emit('getHtml', {
          html: sres.text, propEl
        })
      })
  })
})

/**
 * 课程表
 * @param {Object} param0 userSchedule
 */
const userClassroomCrawler = async ({ sid }) => {
  // const href = host + routes.classroom

  // const ret = await _fetch(userScheduleFilter)(
  //   { sid, href }
  // )

  // return ret
}

module.exports = {
  blog: userBlogCrawler,
  course: userCourseCrawler,
  exam: userExamCrawler,
  schedule: userScheduleCrawler,
  rank: userRankCrawler,
  classroom: userClassroomCrawler
}
