const mongoose = require('mongoose')
const { Schema } = mongoose

const InfoSchema = new Schema({
  title: { type: String, required: true },
  time: { type: Date, require: true },
  link: { type: String, required: true }
})

module.exports = (scope, topic) => mongoose.model(`${scope}-${topic}`, InfoSchema)
