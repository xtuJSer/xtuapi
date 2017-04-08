module.exports = {
  port: 3000,
  session: {
    secret: 'magicalLu',
    key: 'apiLu',
    maxAge: 1000 * 60 * 60 * 24 * 30
  },
  mongodb: 'mongodb://localhost:27017/apilu'
}