const userClassroomCrawler = require('../../../crawlers/userClassroomCrawler')
const { judgeDay } = require('../../../filters/userClassroom')

module.exports = async (req, res, isUser = true) => {
  if (!isUser) {
    let day = req.body.day || 0
    ;(day < 0 || day > 1) && (day = 0)

    res.status(200).json(require('../../../store/classroom_' + judgeDay(day) + '.json'))
  } else {
    let session = await require('./login-Alpha')(req, res, false)
    await userClassroomCrawler(req, res, session)
  }
}
