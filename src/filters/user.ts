import * as cheerio from 'cheerio'

type COMMON_TYPE = {
  html: string
}

type COURSE_TYPE = {
  html: string,
  time: string
}

export const infoFilter = ({ html }: COMMON_TYPE) => {
  const $ = cheerio.load(html)
  let gender = $('.Nsb_layout_r tr').eq(3).find('td').eq(3).text().includes('男') ? 'boy' : 'girl'
  let name = $('.Nsb_layout_r tr').eq(3).find('td').eq(5).text().trim()

  let scope = $('.Nsb_layout_r tr').eq(2).find('td').eq(0).text().split('：')[1]
  let specialty = $('.Nsb_layout_r tr').eq(2).find('td').eq(1).text().split('：')[1]

  let id = $('.Nsb_layout_r tr').eq(-4).find('td').eq(3).text().trim().slice(-6)
  let time = $('.Nsb_layout_r tr').eq(-5).find('td').eq(1).text().trim()

  return {
    name,
    gender,
    id,
    time,
    scope,
    specialty
  }
}

export const courseFilter = ({ time, html }: COURSE_TYPE) => {
  const $ = cheerio.load(html)
  const table: { time: string, data: object[] } = {
    time,
    data: []
  }

  $('#dataList').find('tr').each((idx, tr) => {
    let $td = $(tr).find('td')
    let item = {
      name: $td.eq(2).text(),
      score: $td.eq(3).text(),
      credit: $td.eq(4).text(),
      hours: $td.eq(5).text(),
      property: $td.eq(7).text()
    }

    table.data.push(item)
  })

  table.data.shift()
  return table
}

export const examFilter = ({ html }: COMMON_TYPE) => {
  const $ = cheerio.load(html)
  let $tr = $('#dataList tr')
  let ret: object[] = []

  $tr.each((i, tr) => {
    if (i === 0) return

    let $td = $(tr).find('td')
    const temp = {
      name: $td.eq(2).text(),
      assessmentMethod: $td.eq(3).text(),
      examFormat: $td.eq(4).text(),
      time: $td.eq(5).text(),
      place: $td.eq(6).text()
    }

    ret.push(temp)
  })

  return ret
}

export const scheduleFilter = ({ html }: COMMON_TYPE) => {
  const $ = cheerio.load(html)
  const $tr = $('#kbtable tr')
  const row: object[] = []
  const ret: (object | null)[][] = []

  $tr.each((i, tr) => { row.push(tr) })

  row.shift()
  row.pop()

  row.map((tr, i) => {
    ret[i] = []
    $(tr).find('td').each((j, td) => {
      let $klass = $(td).find('.kbcontent1')
      let name = $klass.text().split(/\d/)[0].trim()

      let details = []
      let $detail = $(td).find('.kbcontent1 font')
      let time = $detail.eq(0).text().split('(')[0]
      let place = $detail.eq(1).text()
      details.push({ time, place })

      // 存在两个时间地点
      if ($klass.text().indexOf('----') !== -1) {
        time = $detail.eq(2).text().split('(')[0]
        place = $detail.eq(3).text()
        details.push({ time, place })
      }

      ret[i][j] = name ? { name, details } : null
    })
  })

  if (ret.length === 0) {
    throw new Error('获取课程失败')
  }

  return ret
}

type RANK_TYPE = {
  html: string,
  propEl: string
}

export const rankFilter = ({ html, propEl }: RANK_TYPE) => {
  type OBJ_TYPE = {
    prop: string,
    list: object
  }

  const $ = cheerio.load(html)
  const list: object[] = []
  const obj: OBJ_TYPE = {
    prop: '',
    list: []
  }

  propEl.length === 1
    ? (obj.prop = propEl === '1' ? '必修' : '选修')
    : obj.prop = '综合'

  $('#dataList tr').find('th').each((i, th) => {
    const ret: { label: string } = { label: '' }

    ret.label = $(th).text()
    list[i] = ret
  })
  $('#dataList tr').find('td').each((i, td) => {
    const ret: { value: string } = { value: '' }

    ret.value = $(td).text()
    list[i] = Object.assign(list[i], ret)
  })
  obj.list = list

  return obj
}

import filter from './classroom'
import { StringValue } from 'aws-sdk/clients/elbv2';

export const classroomFilter = ({ html }: COMMON_TYPE) => {
  const $ = cheerio.load(html)
  const table: object[] = []

  $('#dataList').find('tr').each((idx, tr) => {
    if (idx <= 1) {
      return
    }

    const tdArr = $(tr).find('td')
    const item: { classroomName: string, classroomTime: string[] } = {
      classroomName: $(tdArr[0]).text().trim(),
      classroomTime: []
    }

    for (let i = 1; i < 6; i++) {
      item.classroomTime.push($(tdArr[i]).text().trim())
    }
    table.push(item)
  })

  return filter.classroomFormat(table)
}
