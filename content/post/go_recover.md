+++
categories = ["y"]
date = "2017-10-12T22:40:03+08:00"
description = "当程序异常 panic 时 golang 的 recover() 方法可以很方便地恢复, 但是没有详细的桟信息不便于定位异常, 这里介绍一个简单的方法来获取桟信息"
tags = ["golang"]
title = "go 获取 panic 时详细的桟信息"

+++

当程序异常 panic 时 golang 的 recover() 方法可以很方便地恢复, 但是没有详细的桟信息不便于定位异常, 这里介绍一个简单的方法来获取桟信息

##### runtime.Stack  
> runtime.Stack(buf []byte, all bool) int  
> buf 输出桟信息  
> all 为 true 时包含其它 goroutine 的信息  
> return 桟信息的长度  


##### 示例

```
package main

import "fmt"
import "math"
import "runtime"

func myrecover() {
	if err := recover(); err != nil {
		trace := make([]byte, 1<<16)
		n := runtime.Stack(trace, true)
		s := fmt.Sprintf("panic: '%v'\n, Stack Trace:\n %s", err, string(trace[:int(math.Min(float64(n), float64(7000)))]))
		// 输出详细的桟信息
		fmt.Println(s)
	}
}

func testpanic() {
	defer myrecover()
	panic("test recover")
}

func main() {
	fmt.Println("test begin")
	testpanic()
	fmt.Println("test end")
}

```