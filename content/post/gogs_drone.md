+++
categories = ["y"]
date = "2018-03-22T15:52:36+08:00"
description = "搭建容器化 CI/CD 平台"
tags = ["docker", "mongodb"]
title = "Docker下部署 Gogs & Drone"

+++

参考文档 `http://docs.drone.io/install-for-gogs/`


1. 修改Docker默认的镜像目录

为了提高镜像拉取速度，我们可以使用国内的仓库。

可以通过修改 `/etc/docker/daemon.json` (不存在可创建) 来配置 docker 镜像仓库

```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

重启 docker 服务

```
systemctl restart docker
```

2. 拉取 Gogs 和 Drone

```
# Gogs
sudo docker pull drone/drone

# Drone
sudo docker pull drone/drone
```

3. 配置主机路径

```
# gogs (git server) repo 存储路径
sudo mkdir /opt/gogs
# drone (ci/cd server) 存储路径
sudo mkdir /opt/drone
```

5. 运行镜像

```
# --name 指定容器名称
# -p 端口转发
# -d 分离模式运行
# -v 卷映射
# 镜像标签

# start gogs server
docker run --name=gogs -p 10022:22 -p 3000:3000 -v /opt/gogs:/data gogs/gogs

# start drone server
docker run -d -e DRONE_GOGS=true -e DRONE_GOGS_URL=http://alenstar.org:3000 -e DRONE_OPEN=true -e DRONE_SECRET=MYSECRET -v /tmp/drone:/var/lib/drone -p 9090:8000 --restart=always --name=drone drone/drone

# start drone agent
docker run -d -e DRONE_SERVER=ws://alenstar.org:9090/ws/broker -e DRONE_SECRET=MYSECRET -v /var/run/docker.sock:/var/run/docker.sock --name=drone-agent drone/drone agent

# stop by `docker stop gogs` ; show networkinfo `docker exec gogs ip addr`
```

