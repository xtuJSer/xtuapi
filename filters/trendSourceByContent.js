module.exports = detail => {
  let { content } = detail,
      isFound = false

  for (let i = content.length - 1; i >= 0 && !isFound; i--) {
    if (content[i].includes('年')) {
      detail.source = content[i - 1].replace(/\s+/g, '')
      isFound = true
    } else if (content[i].includes('来源：')) {
      content[i].replace(/：(.*)）/g, (match, g1) => {
        detail.source = g1
      })
      isFound = true
    }
  }
  return detail
}
