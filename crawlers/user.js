const request = require('superagent')
require('superagent-charset')(request)

const {
  url: { host, path: routes },
  headers
} = require('../config').user

const {
  userInfoFilter
} = require('../filters').user

const userInfoCrawler = ({ sid }) => new Promise((resolve, reject) => {
  const href = host + routes.info

  request
    .get(href)
    .set(headers)
    .set('Cookie', sid)
    .charset('utf-8')
    .end((err, sres) => {
      if (err) { reject(err) }

      resolve(
        userInfoFilter({ html: sres.text })
      )
    })
})

module.exports = {
  userInfoCrawler
}
