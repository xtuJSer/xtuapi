const config = require('../config/default')
const trendModel = require('./trendModel')

const mongoose = require('mongoose')
mongoose.connect(config.mongodb)

// const Schema = mongoose.Schema,
//       ObjectId = Schema.ObjectId

const TrendNews = mongoose.model('trendNews', trendModel.Schema)
const TrendMedia = mongoose.model('trendMedia', trendModel.Schema)
const TrendCathedra = mongoose.model('trendCathedra', trendModel.Schema)
const TrendNotice = mongoose.model('trendNotice', trendModel.Schema)

module.exports = {
  TrendNews,
  TrendMedia,
  TrendCathedra,
  TrendNotice,
  getFullkey: trendModel.getFullKey

}
