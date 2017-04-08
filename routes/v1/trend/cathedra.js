const trendCrawler = require('../../../crawlers/trendCrawler')

module.exports = function (req, res) {
  trendCrawler(req, res, 'cathedra')
}