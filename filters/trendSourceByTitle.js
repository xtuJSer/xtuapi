module.exports = (detail, id) => {
  // const END = detail.title.indexOf('】')
  // detail.source = detail.title.substring(1, END)
  let section = detail.title.split('】')
  detail.source = section[0].substring(1)
  detail.title = section[1]

  return detail
}
