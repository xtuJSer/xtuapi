const trendSourceByTitle = require('./trendSourceByTitle')
const trendSourceByContent = require('./trendSourceByContent')

const trendNewsSource = detail => {
  detail.source = detail.content[detail.content.length - 1]
  return detail
}

const trendNoticeSource = detail => trendSourceByContent(detail)

// 获取媒体的作者
const trendMediaSource = detail => trendSourceByTitle(detail)

// 获取讲座的来源
const trendCathedraSource = detail => trendSourceByTitle(detail)

const main = {
  news: trendNewsSource,
  notice: trendNoticeSource,
  media: trendMediaSource,
  cathedra: trendCathedraSource
}

module.exports = (target, details) => {
  let func = main[target]
  console.log(details)
  // 获取来源
  return details.map(detail => func(detail))
}
