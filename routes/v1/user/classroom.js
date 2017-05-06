const userClassroomCrawler = require('../../../crawlers/userClassroomCrawler')

module.exports = async (req, res) => {
  let session = await require('./login-Alpha')(req, res, false)
  await userClassroomCrawler(req, res, session)
}
