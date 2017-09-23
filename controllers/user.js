const {
  userInfoCrawler
} = require('../crawlers').user

const getInfo = async (ctx, { sid = '' }) => {
  let ret = {
    isSuccess: true,
    message: '',
    info: null
  }

  try {
    ret.info = await userInfoCrawler({ sid })
  } catch (e) {
    ret.isSuccess = false
    ret.message = e
  }

  return ret
}

module.exports = {
  getInfo
}
