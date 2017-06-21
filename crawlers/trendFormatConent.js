module.exports = content => {
  let ret = []
  content.every(el => {
    if (el.includes('Flash Player')) {
      ret = ['原博为视频资源，如需查询请点左上角查看原文']
      return false
    }
    el = el.trim().replace(/\s{2,}/g, '')
    el.length !== 0 && ret.push(el)
    return true
  })
  return ret
}
