module.exports = detail => {
  // const END = detail.title.indexOf('】')
  // detail.source = detail.title.substring(1, END)
  // let section = detail.title.split('】')
  let pos = detail.title.indexOf('】')
  detail.source = detail.title.substring(1, pos)
  detail.title = detail.title.substring(pos + 1)

  return detail
}
