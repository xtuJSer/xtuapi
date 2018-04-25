import config from '../config'
const userConfig = require('../../config/private') || {}

import * as schedule from 'node-schedule'
import * as request from 'superagent'
import mail from '../utils/mail'

const URL = `http://localhost:${config.port}/user/classroom`
const UPDATE_TIME = '*/30 0-1 * * *'

const fetchClassroom = () => {
  return request
    .post(URL)
    .send({
      ...userConfig.xtu
    })
    .then((res) => {
      if (res.body.length) {
        console.log('成功获取课程')
        mail.send({
          to: '522413622@qq.com',
          title: '成功获取课程'
        })
      }
    })
    .catch((err) => {
      console.log('获取课程失败', err.message)
      return err
    })
}

;(() => {
  console.log('启用 robot-classroom', URL)

  schedule.scheduleJob(UPDATE_TIME, () => {
    fetchClassroom()
      .catch((err) => {
        mail.send({
          to: '522413622@qq.com',
          title: '获取课程异常',
          html: `${err.message}`
        })
      })
  })
})()
