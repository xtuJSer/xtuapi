const request = require('superagent')
require('superagent-charset')(request)

const {
  url: { host, path: routes },
  defaultTime: { year: defaultYear, half: defaultHalf },
  headers
} = require('../config').user

const {
  userInfoFilter,
  userCourseFilter
} = require('../filters').user

/**
 * 爬取用户信息
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
 * 爬取用户成绩
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

module.exports = {
  info: userInfoCrawler,
  course: userCourseCrawler
}
