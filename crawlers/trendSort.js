module.exports = (details) => {
  return details.sort((a, b) => a.time > b.time ? -1 : 1)
}