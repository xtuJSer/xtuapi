const messageData = require('../../../store/message.json')
const messageRange = require('../../../config/default').messageRange

module.exports = async (req, res) => {
  let itemLength = parseInt(req.body.itemLength)

  for (let i = 0, len = messageRange.length; i < len - 1; i++) {
    if (itemLength < messageRange[i + 1]) {
      let messageIdx = ~~(Math.random() * messageData[i].length)

      return res.status(200).json({ message: messageData[i][messageIdx] })
    }
  }
  return res.status(200).json({ message: '广告：词条征集中，出门右转“关于”页，查看详情' })
}
