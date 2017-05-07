const list = {
  classroomList: [
    '经管',
    '逸夫楼'
  ],
  northOrSouthList: [
    '南山',
    '北山'
  ]
}

// const checkClassroomList = name => {
//   for (let el of classroomList) {
//     if (name.indexOf(el) > -1 && name.indexOf('阶') > -1) { return true }
//   }
//   return false
// }

// const checkNorthOrSouthList = name => {
//   for (let el of northOrSouthList) {
//     if (name.indexOf(el) > -1 && name.indexOf('阶') > -1) { return true }
//   }
//   return false
// }

const checkList = listName => name => {
  for (let el of list[listName]) {
    if (name.indexOf(el) > -1 && name.indexOf('阶') > -1) { return true }
  }
  return false
}

module.exports = {
  checkList
}