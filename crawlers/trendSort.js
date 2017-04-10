module.exports = (details) => {
  return details.sort((a, b) => {
    if (a.time > b.time) { return -1 }
    else if (a.time < b.time) { return 1 }
    return 0
  })
}