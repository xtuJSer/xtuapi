const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  username: String,
  token: String
})

module.exports = mongoose.model('user', UserSchema)
