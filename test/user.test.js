const request = require('supertest')

const app = require('../app')
const server = app.listen(3030)
const testRequest = request(server)
// const testRequest = request.agent(server)

const loginData = require('../config/private') || {}
const testFn = function (method, url, done) {
  return testRequest[method](url)
    .set('Accept', 'application/json')
    .send(loginData)
    .expect(200)
    .end((err, res) => {
      if (err) {
        throw new Error(err)
      }

      return done(res)
    })
}

describe(`#TEST User`, () => {
  it('post login', (done) => {
    testFn('post', '/user/login', (res) => {
      console.log(res.body.token)
    })
  })
})
