export const setNumber = (rules) => {
  return (target, value) => {
    const rule = rules[target]

    if (!rule) {
      return value
    }

    if (rule.type && rule.type.prototype.constructor.name !== 'Number') {
      return value
    }

    const number = +(value)

    // 非数值返回原值 value
    if (Number.isNaN(number)) {
      return value
    }

    // 无规则，返回转换后的 number
    if (!rules[target]) {
      return number
    }

    const MAX = rules[target].hasOwnProperty('max')
      ? rules[target].max
      : Number.MAX_SAFE_INTEGER

    const MIN = rules[target].hasOwnProperty('min')
      ? rules[target].min
      : Number.MIN_SAFE_INTEGER

    return Math.max(
      Math.min(MAX, number), MIN
    )
  }
}

export const setDefault = (rules) => {
  return (target, value) => {
    if (value === undefined && rules[target] && rules[target].hasOwnProperty('default')) {
      return rules[target].default
    }
    return value
  }
}

export const siftUndefinedKey = (opts) => {
  let ret = {}

  Object.keys(opts).map(key => {
    if (opts[key] !== undefined) {
      ret = Object.assign(ret, { [key]: opts[key] })
    }
  })

  return ret
}
