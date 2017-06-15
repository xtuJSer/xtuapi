const fs = require('fs')
const schedule = require('node-schedule')
const request = require('superagent')

const URL = 'https://xtuapi.magicallu.cn/v1/user/classroom'
const updateTime = ['10 0 0 * * *', '10 10 0 * * *', '21 21 0 * * *', '5 5 5 * * *', '6 6 6 * * *']
const confirmTime = ['30 0 0 * * *', '11 11 0 * * *', '22 22 0 * * *', '50 5 5 * * *', '50 6 6 * * *']

const fetchData = (day, byName) => new Promise((resolve, reject) => {
  request.post(URL)
    .send({
      byName,
      day,
      isRobot: 1
    })
    .end((err, data) => {
      if (err) { reject(err) }

      console.log(`${new Date()} userClassroomRobot 更新数据 byName: ${byName}, day: ${day}`)
      resolve(data.text)
    })
})

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

  for (let time of confirmTime) {
    schedule.scheduleJob(time, () => {
      fs.writeFile('./confirmTime.txt', '滴，学生卡', () => console.log(`${new Date()} confirmTime`))
    })
  }
})()
