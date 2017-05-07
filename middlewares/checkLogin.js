module.exports = (req, res, next) => {
  if (!req.session.xtu) {
    return res.status(500).send('若要查询 /user 下的资源，请先登录')
  }
  next()
};