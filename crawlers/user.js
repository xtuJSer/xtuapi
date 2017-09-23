const request = require('superagent')
require('superagent-charset')(request)

const {
  url: { host, path: routes },
  defaultTime: { year: defaultYear, half: defaultHalf },
  headers
} = require('../config').user

const {
  userInfoFilter,
  userCourseFilter,
  userExamFilter
} = require('../filters').user

// const fetchType = () => {}

/**
 * 信息
 * @param {Object} param0 userInfo
 */
const userInfoCrawler = ({ sid }) => new Promise((resolve, reject) => {
  const href = host + routes.info

  request
    .get(href)
    .set(headers)
    .set('Cookie', sid)
    .charset('utf-8')
    .end((err, sres) => {
      if (err) { reject(err) }

      resolve(
        userInfoFilter({ html: sres.text })
      )
    })
})

/**
 * 成绩
 * @param {Object} param0 userCourse
 */
const userCourseCrawler = ({ sid, body }) => new Promise((resolve, reject) => {
  const {
    year = defaultYear,
    half = defaultHalf
  } = body

  const time = year + '-' + (+year + 1) + '-' + half
  const href = host + routes.course

  request
    .get(href + time)
    .set(headers)
    .set('Cookie', sid)
    .charset('utf8')
    .end((err, sres) => {
      if (err) { reject(err) }

      resolve(
        userCourseFilter({ html: sres.text, time })
      )
    })
})

/**
 * 考试信息
 * @param {Object} param0 userCourse
 */
const userExamCrawler = ({ sid, body }) => new Promise((resolve, reject) => {
  const year = defaultYear
  const half = defaultHalf
  const href = host + routes.exam

  request
    .post(href)
    .send(`xqlbmc=&xnxqid=${year}-${half}&xqlb=`)
    .set(headers)
    .set('Cookie', sid)
    .charset('utf-8')
    .end((err, sres) => {
      if (err) { reject(err) }

      resolve(
        userExamFilter({ html: sres.text })
      )
    })
})

module.exports = {
  info: userInfoCrawler,
  course: userCourseCrawler,
  exam: userExamCrawler
}
