// BUG:
import * as mongoose from 'mongoose'
import config from '../config'

mongoose.Promise = global.Promise
mongoose.connect(
  config.mongoURL, {
  useMongoClient: true
})

export default mongoose
