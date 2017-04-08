const trendCrawler = require('../../../crawlers/trendCrawler')

module.exports = function (req, res) {
  trendCrawler('news', function (data) {

  })


  res.status(200).send('news')
}