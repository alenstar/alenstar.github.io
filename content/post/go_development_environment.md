+++
categories = ["y"]
date = "2017-05-12T23:50:33+08:00"
description = "Go语言是谷歌推出的一种全新的编程语言， 可以在不损失应用程序性能的情况下降低代码的复杂性。"
tags = ["go"]
title = "golang开发环境搭建"

+++

### 安装golang工具包  
笔者使用的是Debian sid 直接使用apt-get安装就好  

```   
$ sudo apt-get install golang -y  
```  

### 配置环境变量  

#### 1. 配置GOPATH  
go将从这里寻找package, go get 下载的package将保存刀$GOPATH/src目录下, go install 安装的程序将放在$GOPATH/bin目录下, %GOPATH/pkg下放的是预编译的package object文件  

```   
$ sudo echo "export GOPATH=$HOME/workspace/golang" >> ~/.bashrc  
$ sudo echo "export PATH=$GOPATH/bin:$PATH" >> ~/.bashrc  
```  

#### 2. 测试golang环境  
golang按 域名/用户名(或组织名)/项目名 的形式组织package. 
   
我们也可以使用这种方式来开发和管理项目  

#####    2.1 创建测试用项目目录  
    
```   
$ mkdir -p $GOPATH/hello.com/test/hello  
```  

#####    2.2 编写hello.go程序 

```
$ touch $GOPATH/hello.com/test/hello/main.go
```

用喜欢的编辑器打开main.go文件编辑 

```
// 包名, main包是入口
package main

// 导入fmt包, fmt提供Printf等系列函数
import "fmt"

// main函数, 入口函数
func main() {
    // 输出道控制台
	fmt.Printf("Hello, world.\n")
}
```

##### 2.3 运行和安装hello程序  
进入$GOPATH/hello.com/test/hello目录   

使用 go run main.go 运行程序, 可以看到"Hello, world."输出.  

用 go install (或者 go install hello.com/test/hello)安装hello程序到%GOPATH/bin目录下, 这样就可以直接运行hello程序啦-v-  
