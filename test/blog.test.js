const request = require('supertest')

const app = require('../app')
const server = app.listen(3030)
const testRequest = request(server)

const { blog: { scopes } } = require('../config')
const target = 'blog'

describe(`#TEST ${target}`, () => {
  scopes.map(scope => {
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
