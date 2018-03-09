import * as mongoose from 'mongoose'
const { Schema } = mongoose
const Classroom = new Schema({
  day: Number,
  data: Schema.Types.Mixed
})

type TYPE = {
  day: number,
  data: string
};

/**
 * 通过 day 判断更新对象，并返回
 */
Classroom.statics.updateByDay = async function ({ data, day = 0 }: TYPE) {
  await this.findOneAndUpdate(
    { day },
    { $set: { data } }
  ).exec()
}

/**
 * 按需获取数据库中的数据
 */
Classroom.statics.getByDay = async function ({ day = 0 }: TYPE) {
  let ret = await this.findOne(
    { day },
    { data: 1, _id: 0 }
  ).exec()

  return ret
}

export default Classroom
