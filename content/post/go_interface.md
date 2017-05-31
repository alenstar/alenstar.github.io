+++
categories = ["y"]
date = "2017-05-14T19:23:04+08:00"
description = "Go语言的主要设计者之一罗布·派克（ Rob Pike）曾经说过，如果只能选择一个Go语言的特 性移植到其他语言中，他会选择接口。"
tags = ["go"]
title = "go interface"

+++

---

# 介绍
go的interface不同于其它语言, 它是隐式实现的, 不用特意声明实现了T接口, 只要实现T接口的方法, 我们就说它实现了T接口, 不过这也带来了一个问题, 我们很难知道它实现了那些接口, 这个只有看文档才知道.

# 示例
```
package main

import "fmt"

// 定义ITest接口
type ITest interface {
	Print()
}

// 以ITest接口为参数的函数
func RunPrint(t ITest) {
	t.Print() // 调用Print方法
}

type TestBase struct {
	baseName string
}

// 实现Print方法, TestBase就实现了ITest接口
func (t *TestBase) Print() {
	fmt.Printf("TestBase: %s\n", t.baseName)
}

type TestA struct {
	name string
}

// 实现Print方法, TestA就实现了ITest接口
func (t *TestA) Print() {
	fmt.Printf("TestA: %s\n", t.name)
}

type TestB struct {
	name string
}

// 实现Print方法, TestB就实现了ITest接口
func (t *TestB) Print() {
	fmt.Printf("TestB: %s\n", t.name)
}

type TestC struct {
	TestBase // 组合TestBase
	baseName string
	name     string
}

func (t *TestC) Hi() {
	fmt.Printf("TestC.Hi: hello world %s %s\n", t.baseName, t.name)
}

func (t *TestC) Say() {
	fmt.Printf("TestC.Say: hello world %s %s\n", t.baseName, t.name)
	t.Hi()
}

type TestD struct {
	TestC
	name string
}

func (t *TestD) Hi() {
	fmt.Printf("TestD.Hi: hello world %s %s\n", t.baseName, t.name)
}

// 实现ITest接口
func (t *TestD) Print() {
	fmt.Printf("TestD: %s %s\n", t.baseName, t.name)
	t.Say()
}

func main() {
	RunPrint(&TestBase{baseName: "base"})

	RunPrint(&TestA{name: "a"})

	RunPrint(&TestB{name: "b"})

	// TestC没有实现ITest接口, 但是它组合了TestBase(实现了ITest接口), 调用的实际是TestBase对象
	RunPrint(&TestC{baseName: "base c", name: "c"})

	// 调用TestBase的Print方法, 访问的也是TestBase的字段
	c := &TestC{baseName: "base c", name: "c"}
	c.TestBase.baseName = "TestBase.base"
	RunPrint(c)

    // TestD实现了ITest接口
	RunPrint(&TestD{name: "d"})
}

```

# 运行
```
$ go run interface.go 
TestBase: base  // 调用TestBase对象
TestA: a        // 调用TestBase对象
TestB: b        // 调用TestBase对象
TestBase:       // 传入TestC对象, 调用的是TestBase对象
TestBase: TestBase.base // 传入TestC对象, 调用的是TestBase对象, 访问的也是TestBase的字段
TestD:  d               // 调用TestD对象
TestC.Say: hello world  // TestD没有Say方法, 自动向下查找到TestC并调用TestC对象
TestC.Hi: hello world   // TestC对象不能向上调用TestD的Hi方法, 还是调用自己的Hi方法

```
