const userClassroomCrawler = require('../../../crawlers/userClassroomCrawler')

module.exports = async (req, res) => {
  await require('./login')(req, res, false)
  await userClassroomCrawler(req, res)
}
