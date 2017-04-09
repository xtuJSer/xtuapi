const fs = require('fs');
const path = require('path');

const cheerio = require('cheerio')
const charset = require('superagent-charset');
const superagent = require('superagent');
charset(superagent);

const tesseract = require('node-tesseract');
const gm = require('gm');

const config = require('../../../config/default')

let Header = {
  // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
  'User-Agent': "Mozilla/5.0 (Windows; U; Win98; zh-CN; rv:0.9.2) Gecko/20010725 Netscape6/6.1",
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,de;q=0.2,la;q=0.2'
};

module.exports = function (req, res) {
  const loginUrl = config.xtuUrl.user.host
  const postUrl = loginUrl + config.xtuUrl.user.path.login
  const imgUrl = loginUrl + config.xtuUrl.user.path.verification

  const username = req.body.username;
  const password = req.body.password;

  // let cookie = req.session.xtu;

  // let isSuccess = false;


  // let p = new Promise((resolve, reject) => {
  //   superagent
  //     .get(loginUrl)
  //     .end((err, sres) => {
  //       if (err) { reject(err) }
  //       cookie = sres.headers['set-cookie'].pop().split(';')[0]
  //       console.log('新建 cookie: ' + cookie)

  //       superagent
  //         .get(imgUrl)
  //         .set(Header)
  //         .set('Cookie', cookie)
  //         .end((err1, sres1) => {
  //           if (err1) { reject(err) }
  //           fs.writeFileSync('./img/' + username + '.jpg', sres1.body)
  //           resolve()
  //         })
  //     })
  // })
  // .then(() => {
  //   gm('./img/' + username + '.jpg')
  //     .despeckle() //去斑
  //     .contrast(-2000) //对比度调整
  //     .write('./img/gm.jpg', function (err) {
  //       if (err) { throw new Error(err)}
  //       let options = {
  //         l: 'lu',
  //         // binary: '/usr/bin/tesseract' // centos
  //         binary: '/usr/local/bin/tesseract' // mac
  //       }
  //       tesseract.process('./img/gm.jpg', options, function (err1, ret) {
  //           if (err1) { throw new Error(err1) }
  //           ret = ret.replace(/[\r\n\s]/gm, '').substr(0, 4).toLowerCase();
  //           console.log(ret);
  //           if (ret.length !== 4 || ret.match(/\W/g) !== null) {
  //             console.log('验证码不符合要求 ' + ret)
  //             res.status(500).send('验证码不正确，登录失败: ' + ret)
  //             throw new Error('验证码不符合要求 ' + ret)
  //           }
  //           superagent
  //             .post(postUrl)
  //             .type('form')
  //             .set(Header)
  //             .set('Cookie', cookie)
  //             .charset('gbk')
  //             .send({
  //               USERNAME: username,
  //               PASSWORD: password,
  //               RANDOMCODE: ret
  //             })
  //             .end((err2, sres) => {
  //               if (err2) {
  //                 throw new Error(err2)
  //               }

  //               if (sres.text.indexOf('用户名或密码错误') === -1) {
  //                 console.log('成功登录')
  //                 // let $ = cheerio.load(sres.text)
  //                 // fs.writeFileSync('login_test', sres.text)
  //                 // req.session.xtu = cookie
  //                 // console.log('成功申请到的 cookie, 并存入 req.session: ' + req.session.xtu);
  //                 // res.send('Success...')
  //                 res.status(200).send('成功登录')
  //               }

  //               else {
  //                 console.log(sres.text);
  //                 console.log('验证码不正确, 登录失败: ' + ret)
  //                 res.status(500).send('验证码不正确，登录失败: ' + ret)
  //               }
  //             })
  //         })
  //     })
  // })
  // .catch((err) => {
  //   res.status(500).send('登录过程发生错误')
  // })
}