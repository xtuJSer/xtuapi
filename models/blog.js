const mongoose = require('mongoose')
const { Schema } = mongoose

const BlogSchema = new Schema({
  title: String,
  time: Date,
  href: String,
  topic: String
})

/**
 * type 最新数据的 type 属性
 */
BlogSchema.statics.getNewestTitle = async function ({ topic }) {
  const options = topic ? { topic } : {}

  let newest = await this.findOne(options).sort(
    { time: -1, _id: -1 }
  ).exec()

  return newest && newest.title
}

/**
 * 按需获取数据库中的数据
 */
BlogSchema.statics.getList = async function ({ limit, cursor, topic }) {
  const options = topic ? { topic } : {}

  // cursor || (cursor = await this.getNewestTitle(options))
  // cursor || (cursor = 0)

  let list = await this.find(
    { ...options },
    { _id: 1, href: 1, title: 1, time: 1, topic: 1 }
  ).sort(
    { time: -1, _id: -1 }
  ).limit(limit).skip(cursor).exec()

  return list || []
}

/**
 * 获取当前最后一个返回值的下一个 id
 */
// BlogSchema.statics.getNextId = async function ({ last }) {
//   if (!last) { return '' }

//   let id = await this.findOne(
//     { _id: { $lt: last._id } },
//     { _id: 1 }
//   ).sort(
//     { time: -1, _id: -1 }
//   ).exec()

//   return id ? id._id : ''
// }

module.exports = scope => mongoose.model(scope, BlogSchema)
