+++
categories = ["y"]
date = "2017-08-02T15:56:36+08:00"
description = ""
tags = ["docker"， “mongodb”]
title = "Docker下部署MongoDB"

+++

1. 修改Docker默认的镜像目录

```
# 用以下一行来替换 ExecStart=/usr/bin/dockerd -H fd:// $DOCKER_OPTS
# ExecStart=/usr/bin/docker daemon -g /opt/docker -H fd:// $DOCKER_OPTS
# /opt/docker 为自定义目录 
vim /lib/systemd/system/docker.service

# restart server
systemctl reload
systemctl d
```

2. ENTRYPOINT 与 CMD

```
# Dockerfile
ENTRYPOINT = ["mongod"]
```
使用 ENTRYPOINT 时，启动docker时可以将额外的参数传入，  
即 ENTRYPOINT = ["mongod", "--noprealloc". "--smallfiles", "--replSet", "rs1"]

```
docker run --name mongodb01 -p 27117:27017 -d alen/alpine-mongo --noprealloc --smallfiles --replSet rs1
```

```
# Dockerfile
CMD = ["mongod", "--smallfiles"]
```
使用 CMD 时，启动docker时如果加启动参数， 该参数将覆盖 CMD 的命令和参数,  
即 CMD = ["mongod", "--noprealloc" , "--replSet", "rs1"]

```
docker run --name mongodb01 -p 27117:27017 -d alen/alpine-mongo mongod --noprealloc --replSet rs1
```

3. Dockerfile

创建Dockerfile文件

```
# 使用alpine做为基础镜像， edge为alpine的版本 
FROM alpine:edge

# 更新软件包信息
RUN apk update
# 安装 mongodb
RUN apk add mongodb

# 创建 mongodb 数据目录
RUN mkdir /data
RUN mkdir /data/db

# 开放端口
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017

# 启动 mongodb
ENTRYPOINT ["/usr/bin/mongod"]
```

4. 构建Docker镜像

在Dockerfile所在目录下执行

```
# -t 指定镜像标签
docker build -t alenstar/alpine-mongo .
```
5. 运行镜像

```
# --name 指定容器名称
# -p 端口转发
# -d 分离模式运行
# 镜像标签
docker run --name mongodb01 -p 27117:27017 -d alenstar/alpine-mongo
docker start mongodb01 # stop by `docker stop mongodb01` ; show networkinfo `docker exec mongodb01 ip addr`
```