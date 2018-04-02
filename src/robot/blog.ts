import config from '../config'
import blogConfig from '../config/blog'
import * as schedule from 'node-schedule'
import * as request from 'superagent'

const HOST = `http://localhost:${config.port}`
const UPDATE_TIME = '*/15 8-22 * * *'

const fetchAllBlog = () => {
  blogConfig.scopes.map(scope => {
    const scopeName = scope[0]
    const topics = Object.keys(scope[1].path)

    topics.map(topic => {
      const fullPath = `${HOST}/blog/${scopeName}/${topic}`

      console.log('正在获取', fullPath)

      request
        .get(fullPath)
        .catch((e) => {
          console.log('异常', fullPath, e.message)
          // 发送邮件
        })
    })
  })
}

;(() => {
  console.log('robot-blog', HOST)

  schedule.scheduleJob(UPDATE_TIME, () => {
    fetchAllBlog()
  })
})()
