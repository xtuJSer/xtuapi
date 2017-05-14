# xtuApiLu
> “把湘大办得又大又好。” ——毛爷爷

## 前言
集成目前所有已知的、与湘大相关的数据接口供开发者调用。方便开发者借鉴或直接使用，以此让前端、移动端程序员，或感兴趣的同学获取到简洁的官方数据，并自行包装完善，编写更丰富、精致的应用造福其他湘大学子，共勉。

ps: 原则上只对学校数据进行查询，不会进行任何的增删改操作，即获取的数据是可在正常渠道下在相应的网页上查看的，并不对学校的数据库或其他敏感数据进行爬取，同时限制了并发量，后续也会加入数据库缓存数据，不会因爬取数据而对学校服务器进行高密度的请求。

## 功能介绍
1. 模拟登录（已在云服务器中集成针对教务系统验证码的语言库）
2. 抓取并返回个人数据（个人信息，不存入数据库）
3. 获取湘大官网的新闻资讯（公共信息，存入数据库）以及免登录获取空闲教室数据

### 登录功能
1. 验证码识别率可达95%+
2. 理论上登录成功率可接近100%
3. 若网络问题或在教务管理系统维护期间不可使用

## 可获取的数据
### 需要登录:
1. 考试成绩
2. 课程表
3. 班级、专业排名

### 无需登录:
1. 校内新闻
2. 媒体湘大
3. 通知公告
4. 学术活动
5. 空闲教室

## RESTful API 设计

GET
```
https://xtuapi.magicallu.cn/版本号/类别/数据名
```
POST
```
发送数据格式：{key: value}
```

## 使用方法
可直接在浏览器地址输入框内输入无需登录的 url，来发送 GET 请求获得相应资源，
在浏览器下查看返回的 JSON 数据很凌乱，建议安装 chrome 插件：jsonview 或者 FE助手。

或者使用 chrome 应用: POSTMAN 来发送请求获取资源。

若前端直接调用接口，出于跨域的问题，需要提前向我申请白名单。

若后端服务器调用，则随意使用。

### 获取咨询 - 无需登录
#### 校内新闻
参数 count: 数据数量（≤25）
```
GET https://xtuapi.magicallu.cn/v1/trend/news
GET https://xtuapi.magicallu.cn/v1/trend/news/:count
```

#### 通知公告
参数 count: 数据数量（≤25）
```
GET https://xtuapi.magicallu.cn/v1/trend/notice
GET https://xtuapi.magicallu.cn/v1/trend/notice/:count
```

#### 媒体湘大
参数 count: 数据数量（≤25）
```
GET https://xtuapi.magicallu.cn/v1/trend/media
GET https://xtuapi.magicallu.cn/v1/trend/media/:count
```
#### 学术活动
参数 count: 数据数量（≤25）
```
GET https://xtuapi.magicallu.cn/v1/trend/cathedra
GET https://xtuapi.magicallu.cn/v1/trend/cathedra/:count
```

#### 获取空闲教室
POST 格式：{ day: 今/明（如：0或1), byName: 时间为集合/教学楼为集合 (如：0或1) }

默认返回以时间为集合的今天空闲教室
```
GET https://xtuapi.magicallu.cn/v1/user/classroom
POST https://xtuapi.magicallu.cn/v1/user/classroom
```

### 获取教务系统相关信息 - 需要登录
#### 登录教务系统
POST 格式：{ username: 学号, password: 密码, revoke: 是否撤销 session 重新二次登陆，默认为 0，即否 (如：0或1) }
```
POST https://xtuapi.magicallu.cn/v1/user/login
```

#### 获取成绩
POST 格式：{ year: 学年（如：2016）, half: 学期（如：1或2）}

默认返回 2016-2017-1 的成绩
```
GET https://xtuapi.magicallu.cn/v1/user/course
POST https://xtuapi.magicallu.cn/v1/user/course
```

#### 获取课程表
默认返回当前学期的课程表
```
GET https://xtuapi.magicallu.cn/v1/user/class
```

#### 获取排名
POST 格式：{ fullYear: 学期的完整时间（如：'2016-1'） }
返回 2016-2017-1 的排名

POST 格式：{ fullYear: 连续几个学期的综合排名，使用 & 连接（如：'2015-1&2015-2'）}
返回 2015-2016-1 至 2015-2016-2 的排名

GET 默认返回 2016-2017-1 的排名
```
GET https://xtuapi.magicallu.cn/v1/user/rank
POST https://xtuapi.magicallu.cn/v1/user/rank
```

## 建议
若有有什么见解或想得到的校方数据，欢迎在 issue 中 @我

## 报错或疑问
若有 BUG 请提 issue，或直接私信本人，感谢。


