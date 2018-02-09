import * as iconv from 'iconv-lite'

export default (sres: any, enc?: string) => {
  if (!sres) {
    return
  }

  const buf = new Buffer(sres.text)

  if (!enc) {
    if (sres.headers['content-type']) {
      // Extracted from headers
      enc = (sres.headers['content-type'].match(/charset=(.+)/) || []).pop()
    }

    if (!enc) {
      // Extracted from <meta charset="gb2312"> or <meta http-equiv=Content-Type content="text/html;charset=gb2312">
      enc = (buf.toString().match(/<meta.+?charset=['"]?([^"']+)/i) || []).pop()
    }
  }

  console.log(enc)

  sres.text = iconv.decode(buf, enc)
}
