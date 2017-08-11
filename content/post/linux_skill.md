+++
categories = ["y"]
date = "2017-08-05T13:00:17+08:00"
description = "收集日常使用的linux命令及脚本"
tags = ["linux", "bash"]
title = "Linux 小技巧"

+++

1. 有道词典(Python3)

```
# 使用命令别名
alias youdao='python3 /opt/skill/youdao.py'
```

2. 文件内部搜索(自动递归子目录, 忽略二进制文件)

```
# 命令别名 findstr for string search within file
alias findstr='find `pwd` -type f |xargs grep -s -i -n --binary-files=without-match'
```

3. Shell 重定向

>
0表示标准输入  
1表示标准输出  
2表示标准错误输出  
> 默认为标准输出重定向，与 1> 相同  
2>&1 意思是把 标准错误输出 重定向到 标准输出.  
&>file 意思是把 标准输出 和 标准错误输出 都重定向到文件file中  


4. Docker 镜像加速

修改(不存在则创建) /etc/docker/daemon.json 文件并添加上 registry-mirrors 键值。

```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

重启 Docker

```
systemctl daemon-reload
systemctl restart docker
```

5. npm 镜像加速

安装 cnpm 

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

或者使用别名

```
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"

# Or alias it in .bashrc or .zshrc
$ echo '\n#alias for cnpm\nalias cnpm="npm --registry=https://registry.npm.taobao.org \
  --cache=$HOME/.npm/.cache/cnpm \
  --disturl=https://npm.taobao.org/dist \
  --userconfig=$HOME/.cnpmrc"' >> ~/.zshrc && source ~/.zshrc
```

使用 cnpm 替代 npm



