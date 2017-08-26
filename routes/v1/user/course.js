const userCourseCrawler = require('../../../crawlers/userCourseCrawler')

module.exports = (req, res) => {
  userCourseCrawler(req, res)
}
