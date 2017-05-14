const schedule = require('node-schedule')
const request = require('superagent')

const baseURL = require('../config/default').xtuURL.user
const URL = baseURL.host + baseURL.path.classroom

const updateTime = ['5 0 0 * * *', '11 11 0 * * *', '22 22 0 * * *', '5 5 5 * * *', '6 6 6 * * *']

const getDay = () => {
  for (let el of updateTime) {
    schedule.scheduleJob(el, () => {
      for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= 1; j++) {
          request.post(URL)
            .send({
              byName: i,
              day: j,
              isRobot: 1
            })
            .end((err, data) => {
              console.log(`${Date.now()} userClassroomRobot 更新数据 byName: ${i}, day: ${j}`)
            })
        }
      }
    })
  }
}

getDay()
