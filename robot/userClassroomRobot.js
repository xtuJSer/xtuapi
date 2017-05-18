const schedule = require('node-schedule')
const request = require('superagent')

const baseURL = require('../config/default').xtuURL.user
const URL = baseURL.host + baseURL.path.classroom
const updateTime = ['5 0 0 * * *', '11 11 0 * * *', '22 22 0 * * *', '5 5 5 * * *', '6 6 6 * * *']

const fetchData = (day, byName) => {
  return new Promise((resolve, reject) => {
    request.post(URL)
      .send({
        byName,
        day,
        isRobot: 1
      })
      .end((err, data) => {
        if (err) { reject(err) }

        console.log(`${new Date()} userClassroomRobot 更新数据 byName: ${byName}, day: ${day}`)
        resolve()
      })
  })
}

;(() => {
  for (let time of updateTime) {
    schedule.scheduleJob(time, async () => {
      for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= 1; j++) {
          await fetchData(i, j)
        }
      }
    })
  }
})()
