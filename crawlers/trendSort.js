module.exports = (details) => details.sort((a, b) => a.time > b.time ? -1 : 1)
