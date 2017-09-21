const mongoose = require('mongoose')
const { Schema } = mongoose

const InfoSchema = new Schema({
  title: String,
  time: Date,
  href: String
})

InfoSchema.statics.getNewest = async function (type = '_id') {
  let newest = await this.findOne().sort(
    { _id: -1 }
  ).exec()

  return newest && newest[type]
}

InfoSchema.statics.getList = async function ({ limit = 10, cursor = null }) {
  cursor || (cursor = await this.getNewest())

  let list = await this.find(
    { _id: { $lte: cursor } },
    { _id: 1, href: 1, title: 1, time: 1 }
  ).sort(
    { _id: -1 }
  ).limit(limit).exec()

  return list || []
}

InfoSchema.statics.getNextId = async function ({ last }) {
  if (!last) { return '' }

  let { _id: id } = await this.findOne(
    { _id: { $lt: last._id } },
    { _id: 1 }
  ).sort(
    { _id: -1 }
  ).exec()

  return id || ''
}

module.exports = (scope, topic) => mongoose.model(`${scope}-${topic}`, InfoSchema)
