module.exports = function (content) {
  let ret = []
  content.forEach((el, idx) => {
    el = el.trim().replace(/\s{2,}/g, '')
    el.length !== 0 && ret.push(el)
  })
  return ret
}