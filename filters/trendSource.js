const trendSourceByTitle = require('./trendSourceByTitle')
const trendSourceByContent = require('./trendSourceByContent')

const trendNewsSource = (detail, id) => {}

const trendNoticeSource = (detail, id) => {}

// 获取媒体的作者
const trendMediaSource = (detail, id) => trendSourceByTitle(detail, id)

// 获取讲座的来源
const trendCathedraSource = (detail, id) => trendSourceByTitle(detail, id)

const main = {
  news: trendNewsSource,
  notice: trendNoticeSource,
  media: trendMediaSource,
  cathedra: trendCathedraSource
}

module.exports = (target, details) => {
  let func = main[target]
  console.log(details)
  return details.map((detail, id) => func(detail, id))
}
