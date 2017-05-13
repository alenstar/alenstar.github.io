+++
categories = ["y"]
date = "2017-05-13T07:41:41+08:00"
description = "使用 github pages 配合 CI/CD 等服务 发布我们的blog"
tags = ["git"]
title = "发布个人博客"

+++

### 1. 修改blog仓库设置
github可以自动检测pages, 我们按它的规则发布到gh-pages分支, 或者发布到docs目录下, 通过YourName.github.io就可以进入我们的blog.
   
但是笔者使用过程中发现发布到gh-pages分支时,访问blog的路径成了YourName.github.io/yourblog,没有实现我想要的效果, 访问blog的路径为YourName.github.io, 而发布到docs目录太麻烦, 而其不便于管理, 就不考虑了.   

于是笔者想到发布到master分支, 使用dev分支管理文章, master分支用于发布, 这就可以使用YourName.github.io域名直接访问blog.  

我们可以使用CI/CD服务来实现我们的blog的自动构建和发布, 这样可以省去手工构建和发布的繁琐事务, 每次 git push 之后自动构建并发布到master分支, 实现自动化运维.

#### 1.1 建立dev分支, 移除master分支
```
#建立并进入dev分支
git checkout -b dev
#移除master分支
git push origin --delete master
git branch -d master
#同步dev分支
git push -u origin dev
```

#### 1.2 配置远程仓库
进入github仓库设置页面(Settings), 修改 repository name 为 YourName.github.io 这种形式. 

进入github仓库设置页面(Settings)下的Branches子页, 修改 Default branch 为 dev 分支  

### 2. 配置 CI/CD 
CI/CD服务我们可以使用wercker, 它提供免费的服务. 

访问 (Wercker)[http://www.wercker.com/] , 选择 Get Started for free, 进入登录页面, 我们用github登录就可以啦. 

点击 Create 按钮创建一个Application, 选择 Use Github, 进入github仓库选择页面, 选择我们的blog仓库 YourName.github.io  其它默认, 直到Finsih.  

#### 2.1 配置wercker.yml  
* yml文件使用空格缩进 *

在Wercker的Registry下我们可以看到很多wercker.yml配置脚本, 这里我就直接贴出我的配置啦.  
```
box: debian
build:
  steps:
    - arjen/hugo-build:
        theme: cactus-plus
        flags: --buildDrafts=true
    - script:
        name: ls stuff
        code: |
          ls -haltr /pipeline/source/public

deploy:
  steps:
    - script:
        name: ls output
        code: |
          ls -haltr /pipeline/output
    - script:
        name: ls source
        code: |
          ls -haltr /pipeline/source
    - install-packages:
        packages: git ssh-client liberror-perl
    - sf-zhou/gh-pages@0.2.6:
        token: $GIT_TOKEN
        domain: alenstar.github.io
        basedir: public
        branch: master

```

按我个人的理解, box字段说明构建用的容器类型, build 和 deploy 是两个pipeline, 用于构建和部署的.  

build下的theme字段改成自己的主题名就好.  

deploy下的branch设置为master, 用于发布的分支； basedir是要发布的内容目录, 它是在build阶段生成.  

#### 2.2 提交wercker.yml, 开始第一次构建  
```
git add wercker.yml 
git commit -m "added wercker.yml"
git push
```   

回到Wercker下, 我们可以在Applications下blog应用的Runs看到构建脚本开始运行了. 

#### 2.3 配置Wercker的Workflows  
回到Wercker下, 进入Applications, 选择我们的blog应用, 在Workflows下, 可以看到build pipeline, 现在我们要添加deploy pipeline 来实现自动部署, 点击 Add new pipeline, 设置Name 和 YML Pipeline name 为deploy, 然后Create即可.  

再回到Workflows下, 将deploy关联到build后面, 点"+"就可以的.  

#### 2.4 配置Wercker的Environment  
由于Wercker部署应用时要修改仓库(创建部署用分支), 所以要添加TOKEN.  

先到github的个人设置页面 Generate new token, 并拷贝.  

设置环境变量的Key为GIT_TOKEN(和wercker.yml下的deploy的token相同, 不含$符号), 将拷贝的token粘贴到Value下, 勾选Protected, 并添加.  

### 3. 触发Workflow 
在本地blog仓库下添加新文章, 编辑之后, 添加并提交到dev分支, 就可以触发Workflow, 在Wercker上我们可以看到各个阶段的执行情况.  

### 4. 访问我们的blog 
打开https://YourName.github.io地址就可以访问我们的blog了.  
