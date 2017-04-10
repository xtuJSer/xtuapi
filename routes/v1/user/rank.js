const userRankCrawler = require('../../../crawlers/userRankCrawler')

module.exports = (req, res) => {
  userRankCrawler(req, res)
}