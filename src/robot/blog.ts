import config from '../config'
import blogConfig from '../config/blog'
import mail from '../utils/mail'

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
          const html = `
            <h3>${fullPath}</h3>
            <p>原因: ${e.message}</p>
          `

          mail.send({
            to: '522413622@qq.com',
            title: 'xtuapi-robot-blog 异常',
            html
          })
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
