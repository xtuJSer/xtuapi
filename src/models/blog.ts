import * as mongoose from 'mongoose'
const { Schema } = mongoose

const BlogSchema = new Schema({
  title: String,
  time: Date,
  href: String,
  topic: String,
  scope: String
})

type TYPE = {
  scope: string,
  topic: string,
  limit: number,
  skip: number
};

/**
 * type 最新数据的 type 属性
 */
BlogSchema.statics.getNewestTitle = async function ({ scope, topic }: TYPE) {
  const options = { scope }
  // const options = topic ? { topic } : {}
  topic && (options.topic = topic)

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
BlogSchema.statics.getList = async function ({ limit, skip, scope, topic }: TYPE) {
  const options = topic ? { topic } : {}

  let list = await this.find(
    { ...options, scope },
    { _id: 0, __v: 0 }
  ).sort(
    { time: -1, _id: -1 }
  ).limit(limit).skip(skip).exec()

  return list || []
}

// export default (scope: string) => mongoose.model(scope, BlogSchema)
export default mongoose.model('blog', BlogSchema)
