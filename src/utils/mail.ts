import * as nodemailer from 'nodemailer'
import * as smtpTransport from 'nodemailer-smtp-transport';

const config = require('../../config/private') || {}

export default {
  send: ({ to, title, html }) => {
    return new Promise((resolve, reject) => {
      const transport = nodemailer.createTransport(
        smtpTransport({
          host: 'smtp.qq.com',
          port: 465,
          auth: {
            ...config.mail
          }
        })
      )

      transport.sendMail({
        from: '522413622@qq.com',
        to,
        subject: title,
        html
      }, (err, res) => {
        err && reject(err)

        resolve(res)
      })
    })
  }
}
