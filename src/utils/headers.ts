import config from '../config'
const { headers, userAgent } = config

const updateHeaders = () => {
  headers['User-Agent'] = userAgent[~~(userAgent.length * Math.random())]

  return headers
}

export default {
  updateHeaders
}
