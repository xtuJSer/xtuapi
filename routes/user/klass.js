const userKlassCrawler = require('../../crawlers/userKlassCrawler')

module.exports = (req, res) => {
  userKlassCrawler(req, res)
}
