const request = require('superagent')
require('superagent-charset')(request)

const {
  url: { host, path: routes },
  defaultTime: { year: defaultYear, half: defaultHalf }
} = require('../config').user

const {
  userInfoFilter,
  userCourseFilter,
  userExamFilter,
  userScheduleFilter
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

module.exports = {
  info: userInfoCrawler,
  course: userCourseCrawler,
  exam: userExamCrawler,
  schedule: userScheduleCrawler
}
