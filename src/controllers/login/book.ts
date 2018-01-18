// const {
//   book: {
//     loginToLibrary
//   },
//   comment: {
//     checkFormat,
//     successLogin
//   }
// } = require('../../crawlers').login

// export default ({ username = '', password = '' }, { sid = {} }) => new Promise(async (resolve, reject) => {
//   let isSuccess = false
//   let isWrong = false
//   let token = ''
//   let { isFormat, message } = checkFormat({ username, password })

//   if (!isFormat) {
//     resolve({ message, isSuccess })
//     throw new Error()
//   }

//   try {
//     const cookie = await loginToLibrary({ username, password })
//     const ret = successLogin('book')({ username, cookie, sid })

//     isSuccess = ret.isSuccess
//     token = ret.token
//   } catch (err) {
//     console.error(`登录失败: ${err}`)
//   }

//   if (isWrong) {
//     message = '学号或密码错误'
//   } else if (!isSuccess) {
//     message = '教务系统可能崩了'
//   }

//   resolve({ isSuccess, token, message })
// })
