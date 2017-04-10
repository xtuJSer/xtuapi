# xtuApiLu

> “把湘大办得又大又好。” ——毛爷爷

## 功能介绍

集成目前所有已知的、与湘大相关的数据接口供开发者调用。

方便开发者借鉴或直接使用，以此编写更丰富、精致的应用造福其他湘大学子，共勉。

大体如下：
1. 模拟登录 + 验证码识别
2. 抓取并返回数据

## 可获取的数据

### 需要登录:
1. 个人成绩
2. 班级、专业名次
3. 查看考试信息

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

