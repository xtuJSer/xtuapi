import * as iconv from 'iconv-lite'

export default (sres: any, enc = 'utf-8') => {
  if (!sres) {
    return
  }

  const buf = new Buffer(sres.text)

  sres.text = iconv.decode(buf, enc)
}
