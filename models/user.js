const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  username: String,
  token: String,
  sid: String
})

UserSchema.statics.getSidByToken = async function ({ token = '' }) {
  const sid = await this.findOne(
    { token },
    { sid: 1, username: 1 }
  ).exec()

  return sid
}

module.exports = mongoose.model('user', UserSchema)
