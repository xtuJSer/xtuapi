module.exports = {
  port: process.env.PORT || 3000,

  token: {
    secret: 'xtuapi',
    expiresIn: '1h',
    prefix: 'Bearer '
  },

  mongo_url: 'mongodb://127.0.0.1:27017/xtu',

  info: require('./info'),
  user: require('./user')
}
