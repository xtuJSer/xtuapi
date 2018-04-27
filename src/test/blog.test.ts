import * as request from 'supertest'
const { expect } = require('chai')

import app from '../app'
import config from '../config'

const server = app.listen(config.testPort)
const testRequest = request(server)

import _config from '../config/blog'

type TYPE = {
  scopes: [string, object]
}
const { scopes }: TYPE = _config
const target = 'blog'

describe(`进行 ${target} 接口测试`, () => {
  scopes.map(scope => {
    const scopePath = scope[0]
    const topics = Object.keys(scope[1].path)

    describe(`【${scope[1].name} ${scopePath}】 ${scope[1].host}`, () => {
      topics.map(topic => {
        const fullPath = `/${target}/${scopePath}/${topic}`

        it(`get ${fullPath}`, async () => {
          await testRequest
            .get(fullPath)
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then(res => {
              expect(res.body.scope).to.be.a('string')
              expect(res.body.scope).to.be.equal(scopePath)
              expect(res.body.amount).to.be.a('number')
              expect(res.body.list).to.be.a('array').lengthOf(res.body.amount)
            })
        })
      })
    })
  })
})
