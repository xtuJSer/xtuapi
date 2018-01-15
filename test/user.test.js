const request = require('supertest')

const app = require('../app')
const server = app.listen(3030)
const testRequest = request(server)

const headers = {
  accept: 'application/json'
}
const loginData = require('../config/private') || {}
const testFn = function ({ method = 'get', url, data = null, status = 200 }, done) {
  return testRequest[method](url)
    .set(headers)
    .send(data)
    .expect(status)
    .then(res => {
      return Promise.resolve(
        done ? done(res) : {}
      )
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

describe(`#TEST User`, () => {
  it('【登录】正常登录', async () => {
    await testFn({
      method: 'post',
      url: '/user/login',
      data: loginData
    }, (res) => {
      headers.authorization = `Bearer ${res.body.token}`
    })
  })

  it('【登录】账号密码为空', async () => {
    await testFn({
      method: 'post',
      url: '/user/login',
      status: 401,
      data: {
        username: '',
        password: ''
      }
    })
  })

  it('【登录】账号不符合规范', async () => {
    await testFn({
      method: 'post',
      url: '/user/login',
      status: 401,
      data: {
        ...loginData,
        username: '2014'
      }
    })
  })

  it('【登录】密码错误', async () => {
    await testFn({
      method: 'post',
      url: '/user/login',
      status: 401,
      data: {
        ...loginData,
        password: '12345678'
      }
    })
  })

  it('【登录】方法错误', async () => {
    await testFn({
      method: 'get',
      url: '/user/login',
      status: 404,
      data: loginData
    })
  })
})
