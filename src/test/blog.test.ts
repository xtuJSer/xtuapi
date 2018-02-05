import * as request from 'supertest'

import app from '../app'
import config from '../config'

const server = app.listen(config.testPort)
const testRequest = request(server)

import _config from '../config/blog'
const target = 'blog'

describe(`#TEST ${target}`, () => {
  _config.scopes.map(scope => {
    const scopeName = scope[0]
    const topics = Object.keys(scope[1]).filter(key => key !== 'host')

    describe(`scope: ${scopeName}`, () => {
      topics.map(topic => {
        const fullPath = `/${target}/${scopeName}/${topic}`

        it(`get ${fullPath}`, async () => {
          await testRequest
            .get(fullPath)
            .expect('Content-Type', /application\/json/)
            .expect(200)
        })
      })
    })
  })
})
