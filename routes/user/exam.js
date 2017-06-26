const userExamCrawler = require('../../crawlers/userExamCrawler')

module.exports = (req, res) => {
  userExamCrawler(req, res)
}
