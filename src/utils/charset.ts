import * as iconv from 'iconv-lite'

export default (sres: any, enc?: string) => {
  if (!sres) {
    return
  }

  const buf = new Buffer(sres.text)

  if (!enc) {
    if (sres.headers['content-type']) {
      enc = (sres.headers['content-type'].match(/charset=(.+)/) || []).pop()
    }

    if (!enc) {
      enc = (buf.toString().match(/<meta.+?charset=['"]?([^"']+)/i) || []).pop()
    }
  }

  console.log(enc)

  sres.text = iconv.decode(buf, enc)
}
