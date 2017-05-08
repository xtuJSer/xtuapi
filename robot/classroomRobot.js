const schedule = require('node-schedule')
const request = require('superagent')
const URL = 'https://xtuapi.magicallu.cn/v1/user/classroom'

const getDay = () => {
  schedule.scheduleJob('30 0 0 * * *', () => {
    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 1; j++) {
        request.post(URL)
          .send({
            byName: 1,
            day: 0,
            isUser: false
          })
      }
    }
  })
}

getDay()
