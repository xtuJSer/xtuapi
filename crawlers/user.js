const request = require('superagent')
require('superagent-charset')(request)

const {
  url: { host, path: routes },
  defaultTime: { year: defaultYear, half: defaultHalf }
} = require('../config').user

const {
  userInfoFilter,
  userCourseFilter,
  userExamFilter
} = require('../filters').user

const _fetch = filter => ({ type = 'get', href, sid, data = '' }, options = {}) =>
  new Promise((resolve, reject) => {
    const { headers } = require('../config').user

    request[type](href)
      .set(headers)
      .set('Cookie', sid)
      .send(data)
      .charset('utf-8')
      .end((err, sres) => {
        if (err) { reject(err) }

        resolve(
          filter({ html: sres.text, ...options })
        )
      })
  })

/**
 * 信息
 * @param {Object} param0 userInfo
 */
const userInfoCrawler = async ({ sid }) => {
  const href = host + routes.info
  const ret = await _fetch(userInfoFilter)({ href, sid })

  return ret
}

/**
 * 成绩
 * @param {Object} param0 userCourse
 */
const userCourseCrawler = async ({ sid, body }) => {
  const {
    year = defaultYear,
    half = defaultHalf
  } = body

  const time = year + '-' + (+year + 1) + '-' + half
  const href = host + routes.course

  const ret = await _fetch(userCourseFilter)(
    { href: href + time, sid },
    { time }
  )

  return ret
}

/**
 * 考试信息
 * @param {Object} param0 userCourse
 */
const userExamCrawler = async ({ sid, body }) => {
  const year = defaultYear
  const half = defaultHalf
  const href = host + routes.exam
  const data = `xqlbmc=&xnxqid=${year}-${half}&xqlb=`

  const ret = await _fetch(userExamFilter)(
    { type: 'post', sid, data, href }
  )

  return ret
}

module.exports = {
  info: userInfoCrawler,
  course: userCourseCrawler,
  exam: userExamCrawler
}
