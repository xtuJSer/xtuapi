# xtuApiLu
> “把湘大办得又大又好。” ——毛爷爷

## 前言
集成目前所有已知的、与湘大相关的数据接口供开发者调用。方便开发者借鉴或直接使用，以此让前端、移动端程序员，或感兴趣的同学获取到简洁的官方数据，并自行包装完善，编写更丰富、精致的应用造福其他湘大学子，共勉。

ps: 原则上只对学校数据进行查询，不会进行任何的增删改操作，即获取的数据是可在正常渠道下在相应的网页上查看的，并不对学校的数据库或其他敏感数据进行爬取，同时限制了并发量，后续也会加入数据库缓存数据，不会因爬取数据而对学校服务器进行高密度的请求。

## 功能介绍
1. 模拟登录（已集成针对教务系统验证码进行识别的语言库）
2. 抓取并返回个人数据（个人信息，不存入数据库）
3. 或直接免登陆获取湘大官网的新闻资讯（公共信息，存入数据库）

## 可获取的数据
### 需要登录:
1. 考试成绩
2. 课程表
3. 班级、专业排名
4. 待更新..

### 无需登录:
1. 校内新闻
2. 媒体湘大
3. 通知公告
4. 学术活动
5. 空闲教室
6. 待更新..

## RESTful API 设计

GET
```
协议://子域名.magicallu.cn/版本号/类别/数据/数量
```
POST
```
发送数据：{key: value}
```
DELETE
```
```

## 使用方法
### 获取咨询 - 无需登陆
校内新闻:
```
GET http://xtuapi.magicallu.cn/v1/trend/news
GET http://xtuapi.magicallu.cn/v1/trend/news/count {count: 数据的数量（≤25）}
```
通知公告:
```
GET http://xtuapi.magicallu.cn/v1/trend/notice
GET http://xtuapi.magicallu.cn/v1/trend/notice/count {count: 数据的数量（≤25）}
```
媒体湘大:
```
GET http://xtuapi.magicallu.cn/v1/trend/media
GET http://xtuapi.magicallu.cn/v1/trend/media/count {count: 数据的数量（≤25）}
```
学术活动:
```
GET http://xtuapi.magicallu.cn/v1/trend/cathedra
GET http://xtuapi.magicallu.cn/v1/trend/cathedra/count {count: 数据的数量（≤25）}
```
### 获取教务系统相关信息 - 需要登陆
登陆教务系统:
```
POST http://xtuapi.magicallu.cn/v1/user/login {username: 学号, password: 密码}
```
获取成绩:
```
GET http://xtuapi.magicallu.cn/v1/user/course
POST http://xtuapi.magicallu.cn/v1/user/course {year: 学年（2016）, half: 学期（1/2）}
```
获取课程表:
```
GET http://xtuapi.magicallu.cn/v1/user/class
```

## 提问

待续..

## 报错

待续..

