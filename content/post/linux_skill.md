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
