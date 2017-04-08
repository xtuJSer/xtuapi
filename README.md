# xtuApiLu

> “把湘大办得又大又好。” ——毛爷爷

## 功能介绍

集成目前所有已知的，与湘大相关的数据接口供开发者调用。

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
1. 新闻资讯
2. 空闲教室
3. 待更新..

## RESTful API 设计

GET
```
  获取用户成绩: http://api.magicallu.cn/xtu/v1/score?year=2016&half=1
  获取用户专业/班级名次: http://api.magicallu.cn/xtu/v1/rate
```
POST
```
  模拟教务系统: http://api.magicallu.cn/xtu/v1/login
```
DELETE
```
  退出登陆: http://api.magicallu.cn/xtu/v1/login
```

## 使用方法

待续..

## 提问

待续..

## 报错

待续..

