const fs = require('fs')
const path = require('path')

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

const getNameAndRoom = name => {
  let curName = name,
    nextName = name,
    pos = name.search(/\w/g),
    isClassroom = checkList('classroomList')(name),
    isNorthOrSouth = checkList('northOrSouthList')(name)

  if (/\-/g.test(name)) {
    curName = name.split('-')[0]
    nextName = name.split('-')[1]
  } else if (pos !== -1) {
    curName = name.slice(0, pos)
    nextName = name.slice(pos)
  } else {
    if (isNorthOrSouth) {
      curName = name.substring(0, 2) + '阶梯'
    } else if (isClassroom) {
      curName = isClassroom + '楼'
    }
  }
  return { curName, nextName }
}

const saveData = (type, data, day) => {
  const classroomDataDir = path.join(__dirname, '../store/classroom')
  fs.writeFileSync(classroomDataDir + '/classroom_' + type + '_' + judgeDay(day) + '.json', JSON.stringify(data, null, 2))
}

const formatByTime = (data, day) => {
  let Time = []

  data.map((el, idx) => {
    let name = el.classroomName,
      time = el.classroomTime

    time.map((t, i) => {
      if (t === '空') {
        Time[i] || (Time[i] = [])
        let curTime = Time[i]

        let { curIdx, nextName } = (function (name, curTime) {
          let { curName, nextName } = getNameAndRoom(name)

          for (let i = 0, len = curTime.length; i < len; i++) {
            if (curTime[i].name.indexOf(curName) === 0) {
              return { nextName, curIdx: i }
            }
          }
          curTime.push({ name: curName, room: [] })
          return { nextName, curIdx: curTime.length - 1 }
        })(name, curTime)

        curTime[curIdx].room = [...curTime[curIdx].room, nextName]
      }
    })
  })
  saveData('time', Time, day)
  return Time
}

const formatByName = (data, day) => {
  let Name = {}
  data.map((el, idx) => {
    let name = el.classroomName,
      time = el.classroomTime,
      { curName, nextName } = getNameAndRoom(name)

    Name[curName] || (Name[curName] = [])
    Name[curName].push({ room: nextName, time })
  })

  let ret = []
  Object.keys(Name).forEach(key => {
    ret.push({ name: key, details: Name[key] })
  })

  saveData('name', ret, day)
  return ret
}

const judgeDay = (day) => {
  let today = new Date().getDay()
  return (+day ? today + 1 : today) % 7
}

module.exports = {
  checkList,
  judgeDay,
  getNameAndRoom,
  formatByName,
  formatByTime
}
