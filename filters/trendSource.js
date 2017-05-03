const trendSourceByTitle = require('./trendSourceByTitle')
const trendSourceByContent = require('./trendSourceByContent')

const trendNewsSource = (detail, id) => {

}

const trendNoticeSource = (detail, id) => {

}

// 获取媒体的作者
const trendMediaSource = (detail, id) => {

}

// 获取讲座的来源
const trendCathedraSource = (detail, id) => {
  const END = el.title.indexOf('】')
  details.source = el.title.subString(0, END)
  return details
}

const main = {
  news: trendNewsSource,
  notice: trendNoticeSource,
  media: trendMediaSource,
  cathedra: trendCathedraSource
}

const trendSource = (type, details) => {
  let func = main[type]
  return details.map((detail, id) => func(detail, id))
}

module.exports = {
}
