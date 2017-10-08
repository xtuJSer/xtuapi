const request = require('superagent')
require('superagent-charset')(request)
const Eventproxy = require('eventproxy')

const {
  url: { host, path: routes },
  defaultTime: { year: defaultYear, half: defaultHalf }
} = require('../config').user

const {
  infoFilter,
  courseFilter,
  examFilter,
  scheduleFilter,
  rankFilter,
  classroomFilter
} = require('../filters').user

const ClassroomModel = require('../models').classroom

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
 * @param {Object} param0 userInfo
 */
const infoCrawler = async ({ sid }) => {
  const href = host + routes.info
  const ret = await _fetch(infoFilter)({ href, sid })

  return ret
}

/**
 * 成绩
 * @param {Object} param0 userCourse
 */
const courseCrawler = async ({ sid, param }) => {
  const {
    time = (defaultYear + '-' + defaultHalf)
  } = param

  const fullTime = _getFullTime({
    year: time.split('-')[0],
    half: time.split('-')[1]
  })

  const href = host + routes.course

  const ret = await _fetch(courseFilter)(
    { href: href + fullTime, sid },
    { time: fullTime }
  )

  return ret
}

/**
 * 考试信息
 * @param {Object} param0 userExam
 */
const examCrawler = async ({ sid }) => {
  const href = host + routes.exam
  const data = `xqlbmc=&xnxqid=${defaultYear}-${defaultHalf}&xqlb=`

  const ret = await _fetch(examFilter)(
    { type: 'post', sid, data, href }
  )

  return ret
}

/**
 * 课程表
 * @param {Object} param0 userSchedule
 */
const scheduleCrawler = async ({ sid }) => {
  const href = host + routes.schedule
  const data = `cj0701id=&zc=&demo=&xnxq01id=${defaultYear}-${defaultYear + 1}-${defaultHalf}&sfFD=1`

  const ret = await _fetch(scheduleFilter)(
    { type: 'post', sid, data, href }
  )

  return ret
}

/**
 * 空教室
 * @param {Object} param0 classroomSchedule
 */
const classroomCrawler = async ({ sid, param }) => {
  const href = host + routes.classroom
  let { day = 0 } = param

  day = +day
  day === 0 || (day = 1)

  // sid 用于判断此次操作是否需要更新数据
  if (sid) {
    const ret = [0, 1].map(async day => {
      const data = `xzlx=${day}`
      const _ret = await _fetch(classroomFilter)({ href, sid, data })

      // 首次操作需要取消以下注释，用于插入原始数据
      // 增
      // await new ClassroomModel({
      //   day,
      //   data: _ret
      // }).save()

      // 改
      await ClassroomModel.updateByDay({ day, data: _ret })

      return _ret
    })

    return ret[day]
  } else {
    const ret = await ClassroomModel.getByDay({ day })

    return ret
  }
}

/**
 * 绩点排名
 * @param {Object} param0 userRank
 */
const rankCrawler = async ({ sid, param }) => new Promise((resolve, reject) => {
  const href = host + routes.rank
  const prop = ['all', '7', '1']
  const defaultTime = defaultYear + '-' + defaultHalf
  let { time = defaultTime } = param
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

    result.rank = htmlArr.map((htmlObj) => rankFilter(htmlObj))
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

module.exports = {
  info: infoCrawler,
  course: courseCrawler,
  exam: examCrawler,
  schedule: scheduleCrawler,
  rank: rankCrawler,
  classroom: classroomCrawler
}
