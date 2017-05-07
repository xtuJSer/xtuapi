const list = {
  classroomList: [
    '经管楼',
    '逸夫楼'
  ],
  northOrSouthList: [
    '南山',
    '北山'
  ]
}

const checkList = listName => name => {
  for (let el of list[listName]) {
    if (name.indexOf(el.substring(0, 2)) > -1 && name.indexOf('阶') > -1) { return el }
  }
  return null
}

module.exports = {
  checkList
}