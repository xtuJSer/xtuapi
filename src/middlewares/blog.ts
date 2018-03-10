import * as formatUtils from '../utils/format'

const rules = {
  limit: {
    min: 1,
    max: 20,
    default: 10,
    type: Number
  },
  skip: {
    min: 0,
    default: 0,
    typeof: Number
  }
}

const setNumber = formatUtils.setNumber(rules)
const setDefault = formatUtils.setDefault(rules)

export const _formatData = (ctx) => {
}

export const _formatQuery = (ctx) => {
  const { query } = ctx

  for (let key in query) {
    query[key] = setDefault(key, query[key])
    query[key] = setNumber(key, query[key])
  }
}

export const format = async (ctx, next) => {
  try {
    _formatData(ctx)
    _formatQuery(ctx)

    await next()
  } catch (err) {
    ctx.status = 400
    throw new Error(err.message)
  }
}
