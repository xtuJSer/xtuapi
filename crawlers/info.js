module.exports = (options, newest = '') => {
  return Object.keys(options).map(key => options[key])
}
