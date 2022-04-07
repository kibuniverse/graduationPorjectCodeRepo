<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# CEG 会议系统后端 power by nest


### 数据库设计

```sql
# 用户表
CREATE TABLE IF NOT EXISTS `t_user`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(10) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(16) NOT NULL DEFAULT '' COMMENT '密码',
  `email` varchar(20) DEFAULT '' COMMENT '邮箱',
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 会议房间表
CREATE TABLE IF NOT EXIST `t_room`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '房间id',
  `name` varchar(11) NOT NULL DEFAULT '' COMMENT '房间名称',
  `create_user_id`  int(11) NOT NULL COMMENT '创建房间的用户id',
  `create_time` datetime(6) NULL DEFAULT NULL COMMENT '创建时间',
  `begin_time` datetime(6) NULL DEFAULT NULL COMMENT '预计开始时间', 
  `end_time` datetime(6) NULL DEFAULT NULL COMMENT '预计结束时间',
  `max_capacity` int(5) NULL DEFAULT NULL COMMENT '房间最大容量'
)
```
