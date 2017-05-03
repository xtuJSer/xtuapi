const userClassCrawler = require('../../../crawlers/userClassCrawler')

module.exports = (req, res) => {
  userClassCrawler(req, res)
}
