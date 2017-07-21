+++
categories = ["y"]
date = "2017-07-21T14:24:29+08:00"
description = "好久前写的，在这保存一下，方便以后查阅和补充。"
tags = ["git"]
title = "Git 用法总结"

+++


## Git用法简介 ##

##### Git 版本控制系统

管理维护版本的变更， 发布稳定版， 跟进开发版，
方便问题的跟踪和修复。

* ___配置环境___

```
$ git config --global user.name "用户名"  
$ git config --global user.email "用户邮箱地址"
```

* ___生成SSH密钥___

```
$ ssh-keygen -t rsa -b 4096 -C "邮箱地址" # 按提示设置密码并确认。
$ ssh-agent -s 
$ ssh-add ~/.ssh/id_rsa
$ # 拷贝 ~/.ssh/id_rsa.pub 中的公钥到剪切板， 然后粘贴到git托管服务器的用户账号的SSH密钥添加页面
```

* ___建立本地仓库___

```
git init
```

* ___添加文件___

```
$ git add files
```

* ___删除文件___

```
$ git rm files
$ # Tips 撤销删除 git checkout -- files
```

* ___提交变更___ 

```
$ git add xxx # 添加要提交的文件和变动到暂存区
$ git commit -m “变更说明” # 提交
$ # -------
$ # 撤销未暂存的修改
$ git checkout xxx_file_name # 要撤销的文件名
$ # or: git checkout . # 撤销未暂存的所有修改
```

* ___撤销（暂存区的）修改___ 

```
$ git reset HEAD files
```

* ___撤销提交并重做___

```
$ git commit -m "Something terribly misguided"             # (1)
$ git reset HEAD~                                          # (2)
<< edit files as necessary >>                              # (3)
$ git add ...                                              # (4)
$ git commit -c ORIG_HEAD                                  # (5)
```

* ___关联远程仓库___ 

```
$ git remote add origin xxx # origin 远程仓库别名（默认origin）; xxx 是远程仓库地址  
$ # git remote remove origin # 移除远程仓库关联
```

* ___同步到远程仓库___

```
$ git push 
# #或者 git push -u origin master （关联仓库之后的第一次同步）
```

* ___从远程仓库更新___

```
$ git pull
```

* ___查看分支___

```
$ git branch -a
```

* ___创建分支___

```
$ git branch branchname
```

* ___删除分支___

```
git branch -d|-D branchname
```

* ___切换分支___

```
$ git checkout branchname
```

* ___查看标签___

```
$ git tag
```

* ___创建标签___

```
$ git tag -a tagname -m “tag message” commit_id
```

* ___删除标签___

```
$ git tag-d tagname
```

* ___切换标签___  

```
$ git tag tagname
```

* ___推送标签到远程___  

```
$ git push origin --tags|tagname
```

* ___子模块(submodule)___

```
$ # 添加子模块
$ git submodule add xxx(模块路径和模块名) yyy(url地址) 
$ # -------
$ # 克隆clone有子模块的项目
$ git submodule update --init --recursive
$ # -------
$ # 删除子模块
$ mv a/submodule a/submodule_tmp
$ git submodule deinit -f -- a/submodule    
$ rm -rf .git/modules/a/submodule
$ # ---------
$ git rm -f a/submodule
$ # Note: a/submodule (no trailing slash)
$ # ---------
$ # or, if you want to leave it in your working tree
$ git rm --cached a/submodule
$ mv a/submodule_tmp a/submodule
```

* ___忽略文件___  

在仓库根目录下新建.gitignore文件。

添加规则到.gitignore文件来忽略不用跟踪的文件目录或通配规则，
如：

```
Debug
*.so
*.exe
*.dll
*.o
```
