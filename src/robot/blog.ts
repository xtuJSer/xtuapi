import config from '../config'
import blogConfig from '../config/blog'
import mail from '../utils/mail'

import * as schedule from 'node-schedule'
import * as request from 'superagent'

const HOST = `http://localhost:${config.port}`
const UPDATE_TIME = '*/15 8-21 * * *'

const fetchAllBlog = () => {
  const promises:object[] = []
  const start = Date.now()

  blogConfig.scopes.map(scope => {
    const scopeName = scope[0]
    const topics = Object.keys(scope[1].path)

    topics.map(topic => {
      const fullPath = `${HOST}/blog/${scopeName}/${topic}`
      const promise = request
        .get(fullPath)
        .then((res) => {
          return fullPath
        })
        .catch((error) => {
          return {
            fullPath,
            error
          }
        })

      console.log('正在获取', fullPath)
      promises.push(promise)
    })
  })

  return Promise.all(promises)
    .then((data) => {
      console.log('成功获取 blog 集合', `${Date.now() - start}ms`)
    })
    .catch((err) => {
      console.log('异常', err)
      mail.send({
        to: '522413622@qq.com',
        title: 'xtuapi-robot-blog 异常',
        html: `<p>${err.message}</p>`
      })
    })
}

;(() => {
  console.log('启用 robot-blog', HOST)

  schedule.scheduleJob(UPDATE_TIME, () => {
    fetchAllBlog()
  })
})()
