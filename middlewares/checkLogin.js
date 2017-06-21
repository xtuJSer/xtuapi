module.exports = target => {
  return (req, res, next) => {
    if (!req.session[target]) {
      return res.status(500).send('请先登录')
    }
    next()
  }
}
