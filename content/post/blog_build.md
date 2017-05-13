+++
categories = ["y"]
date = "2017-05-13T06:31:12+08:00"
description = "用hugo建立个人博客,Hugo是由Go语言实现的静态网站生成器。简单、易用、高效、易扩展、快速部署。"
tags = ["blog", "hugo"]
title = "建立个人博客"

+++

### 1. 安装hugo  
*先要配置好go开发环境*
```
go get -v github.com/spf13/hugo  
go install github.com/spf13/hugo
``` 

### 2. 生成站点  
使用hugo new site 命令生成站点, 如生成到$HOME/workspace/blog目录:  
```
hugo new site $HOME/workspace/blog
```  
这样就在$HOME/workspace/blog目录下生成啦初始站点, 进入目录:  
```
cd $HOME/workspace/blog
```  
站点目录结构:  
```
# blog文章目录
content/
layouts/
static/
# hugo站点配置文件
config.toml
```

### 3. 安装主题  
去[themes.gohugo.io](http://themes.gohugo.io/)选一个喜欢的主题,并下载下来  
exampleSite 是主题的一个示例站点，里面有配置文件、关于页面的一些示例。   
```
#创建themes目录
mkdir themes
#下载主题cactus-plus
cd themes 
git clone https://github.com/nodejh/hugo-theme-cactus-plus.git 
#移除.git, 避免和站点项目的.git冲突, 
#当然也可以使用submodule形式组织
rm -rf .git
#将示例模板放到站点根目录
mv exampleSite/* ../
# 回到站点根目录
cd ..
```

### 4. 主题配置
替换$HOME/workspace/blog/themes/cactus-plus/static/images目录下的图片.  

修改站点标题:    

> 打开 config.toml 文件  
> 修改 baseURL 字段为https://YourUsername.github.io形式, 或者你的域名, 用于生成CNAME  
> 修改 title="xxx" 字段  
> 修改 [params] 的 name,description,bio(像是个性签名) 等字段  

### 5. 使用git来管理文章
Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

#### 5.1 初始化本地仓库
```
#hugo默认生成站点到public目录, 我们不需要保留它
echo "public" >> .gitignore
echo "User-agent: *\nDisallow:" > static/robots.txt
git init
git commit -a -m "Initial commit"
```  

#### 5.2 关联远程仓库(github)  
注册并登录github, create repository
```
git remote add origin git@github.com:YourUsername/yourblog.git
git push -u origin master
```
### 6. 添加文章  
```  
#添加文章到content/post目录下
hugo new post/first.md  
#编辑文章, 添加到仓库并提交
git add content
git commit -m "added first.md"
git push
```  

### 7. 运行本地站点 
hugo会监测文件的变动, 我们可以用浏览器访问 http://localhost:1313 ,实时查看文章变动.
``` shell  
hugo server --theme=cactus-plus --buildDrafts  
```  