const list = {
  classroomList: [
    '经管',
    '逸夫'
  ],
  northOrSouthList: [
    '南山',
    '北山'
  ]
}

const checkList = listName => name => {
  for (let el of list[listName]) {
    if (name.indexOf(el) > -1 && name.indexOf('阶') > -1) { return el }
  }
  return null
}

const judgeDay = (day) => {
  let today = new Date().getDay()
  return (day ? today + 1 : today) % 7
}

module.exports = {
  checkList,
  judgeDay
}
