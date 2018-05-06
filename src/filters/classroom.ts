import config from '../config/classroom'

const { ID_LIST } = config

const list = {
  classroomList: [
    '经管',
    '逸夫'
  ],
  northOrSouth: [
    '南山',
    '北山'
  ]
}

const _checkList = listName => name => {
  for (let el of list[listName]) {
    if (name.indexOf(el) > -1 && name.indexOf('阶') > -1) {
      return el
    }
  }
  return null
}

const _classroomGetNameAndRoom = name => {
  let curName = name
  let nextName = name
  let pos = name.search(/\w/g)
  let isClassroom = _checkList('classroomList')(name)
  let isNorthOrSouth = _checkList('northOrSouth')(name)

  if (/-/.test(name)) {
    curName = name.split('-')[0]
    nextName = name.split('-')[1]
  } else if (pos !== -1){
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

const _sortDataById = data => {
  return data.sort((a, b) => a.id - b.id)
}

const classroomFormat = (data) => {
  let item = {}
  data.map((el, idx) => {
    let { classroomName: name, classroomTime: time } = el
    let { curName, nextName } = _classroomGetNameAndRoom(name)

    item[curName] || (item[curName] = [])
    item[curName].push({ room: nextName, time })
  })

  let ret:object[] = []
  Object.keys(item).forEach(key => {
    const id_item = ID_LIST.find(el => el.name === key)

    id_item && ret.push({
      id: id_item.id,
      building: key,
      rooms: item[key]
    })
  })

  return _sortDataById(ret)
}

export default {
  classroomFormat
}
