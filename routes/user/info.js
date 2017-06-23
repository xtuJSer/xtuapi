const userInfoCrawler = require('../../crawlers/userInfoCrawler')

module.exports = (req, res) => {
  userInfoCrawler(req, res)
}
