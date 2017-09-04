const messageData = require('../../store/message.json')
// const messageRange = require('../../../config/default').messageRange

module.exports = async (req, res) => {
  let itemLength = parseInt(req.body.itemLength)
  let notZero = !!Math.max(0, itemLength)
  let messageRandomIndex = ~~(Math.random() * messageData[+notZero].length)

  res.status(200).json({ message: messageData[+notZero][messageRandomIndex] })
}
