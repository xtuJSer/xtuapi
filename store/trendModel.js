// 定义动态咨询的结构
const Schema = {
  title: String,
  time: String,
  href: String,
  content: [String]
}

// 定义获取全名的方法
const getFullKey = (target) => 'Trend' + target.replace(/^\w/g, (el) => el.toUpperCase())

const checkRepeat = () => {

}

const saveModel = (model) => {

}

module.exports = {
  Schema,
  getFullKey
}
