const mongoose = require('mongoose')
const { Schema } = mongoose

const InfoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    require: true
  },
  link: {
    type: String,
    required: true
  }
})

/**
 * type: '_id' || 'title'
 */
InfoSchema.static.getNewest = async function (type = '_id') {
  let newest = await (this.findOne().sort({ _id: -1 }).exec())[type]
  return newest
}

module.exports = (scope, topic) => mongoose.model(`${scope}-${topic}`, InfoSchema)
