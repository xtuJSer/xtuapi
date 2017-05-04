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
  // 若最后一项不是时间，也不是记者，那么就除去
  // while (!ret[ret.length - 1].includes('年') || !ret[ret.length - 1].includes('《湘潭大学报》记者')) {
  //   ret.pop()
  // }
  return ret
}