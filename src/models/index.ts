import * as mongoose from 'mongoose'
import config from '../config'

import blog from './blog'
import classroom from './classroom'

mongoose.Promise = global.Promise
mongoose.connect(
  config.mongoURL, {
  useMongoClient: true
})

export const Blog = mongoose.model('Blog', blog)
export const Classroom = mongoose.model('Classroom', classroom)
