import * as mongoose from 'mongoose'
const { Schema } = mongoose

const BlogSchema = new Schema({
  title: String,
  time: Date,
  href: String,
  topic: String
})

type TYPE = {
  topic: string,
  limit: number,
  skip: number
};

/**
 * type 最新数据的 type 属性
 */
BlogSchema.statics.getNewestTitle = async function ({ topic }: TYPE) {
  const options = topic ? { topic } : {}

  let newest = await this.findOne(
    options
  ).sort(
    { time: -1, _id: -1 }
  ).exec()

  return newest && newest.title
}

/**
 * 按需获取数据库中的数据
 */
BlogSchema.statics.getList = async function ({ limit, skip, topic }: TYPE) {
  const options = topic ? { topic } : {}

  let list = await this.find(
    { ...options },
    { _id: 0, __v: 0 }
  ).sort(
    { time: -1, _id: -1 }
  ).limit(limit).skip(skip).exec()

  return list || []
}

export default (scope: string) => mongoose.model(scope, BlogSchema)
