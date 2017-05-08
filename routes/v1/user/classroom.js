const userClassroomCrawler = require('../../../crawlers/userClassroomCrawler')

module.exports = async (req, res, isUser = true) => {
  if (!isUser) {
    let session = await require('./login-Alpha')(req, res, false)
    await userClassroomCrawler(req, res, session)
  } else {
    let day = req.body.day || 0,
        today = new Date().getDay()
    ;(day < 0 || day > 1) && (day = 0)
    res.status(200).json(require('../../../store/classroom_' + ((day ? today + 1 : today) % 7) + '.json'))
  }
}
