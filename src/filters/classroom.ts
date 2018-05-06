const ID_LIST = [
  { name: '逸夫楼', id: '01' },
  { name: '一教楼', id: '02' },
  { name: '兴湘学院三教', id: '03' },
  { name: '文科楼', id: '04' },
  { name: '外语楼', id: '05' },
  { name: '土木楼', id: '06' },
  { name: '经管楼', id: '07' },
  { name: '法学楼', id: '08' },
  { name: '法学附', id: '09' },
  { name: '南山阶梯', id: '10' },
  { name: '北山阶梯', id: '11' },
  { name: '工科楼阶梯', id: '12' },
  { name: '图书馆南', id: '13' },
  { name: '体育馆', id: '14' },
  { name: '计算中心', id: '15' },
]

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
