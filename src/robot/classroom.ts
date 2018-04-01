import config from '../config'
const userConfig = require('../../config/private') || {}

import * as schedule from 'node-schedule'
import * as request from 'superagent'

const URL = `http://localhost:${config.port}/user/classroom`
const UPDATE_TIME = '*/15 0 * * *'

const fetchClassroom = () => {
  request
    .post(URL)
    .send({
      ...userConfig
    })
    .then((res) => {
      if (res.body.length) {
        console.log('成功获取课程')
      }
    })
    .catch((err) => {
      console.log('获取课程失败', err.message)
    })
}

;(() => {
  console.log('robot-classroom', URL)

  schedule.scheduleJob(UPDATE_TIME, () => {
    fetchClassroom()
  })
})()
