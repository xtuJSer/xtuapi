const mongoose = require('mongoose')
const { Schema } = mongoose

const BlogSchema = new Schema({
  title: String,
  time: Date,
  href: String,
  topic: String
})

BlogSchema.statics.getNewest = async function (type = '_id') {
  let newest = await this.findOne().sort(
    { _id: -1 }
  ).exec()

  return newest && newest[type]
}

BlogSchema.statics.getList = async function ({ limit = 10, cursor = null }) {
  cursor || (cursor = await this.getNewest())

  let list = await this.find(
    { _id: { $lte: cursor } },
    { _id: 1, href: 1, title: 1, time: 1 }
  ).sort(
    { _id: -1 }
  ).limit(limit).exec()

  return list || []
}

BlogSchema.statics.getNextId = async function ({ last }) {
  if (!last) { return '' }

  let id = await this.findOne(
    { _id: { $lt: last._id } },
    { _id: 1 }
  ).sort(
    { _id: -1 }
  ).exec()

  return id ? id._id : ''
}

module.exports = (scope, topic) => mongoose.model(`${scope}-${topic}`, BlogSchema)
