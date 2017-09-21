const mongoose = require('mongoose')
const { Schema } = mongoose

const InfoSchema = new Schema({
  title: String,
  time: Date,
  href: String
})

/**
 * type: '_id' || 'title'
 */
InfoSchema.statics.getNewest = async function (type = '_id') {
  let newest = await this.findOne().sort({ _id: -1 }).exec()

  return newest && newest[type]
}

module.exports = (scope, topic) => mongoose.model(`${scope}-${topic}`, InfoSchema)
