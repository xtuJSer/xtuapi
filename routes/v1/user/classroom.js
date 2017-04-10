const userClassroomCrawler = require('../../../crawlers/userClassroomCrawler')

module.exports = (req, res) => {
  userClassroomCrawler(req, res)
}