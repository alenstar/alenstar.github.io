+++
categories = ["y"]
date = "2017-05-14T15:30:18+08:00"
description = "go 标准库提供测试框架, 但是它还不够简洁, assert库提供更加简洁的断言测试"
tags = ["go"]
title = "go 单元测试框架 assert"

+++

### 安装
使用 go get.
```
$ go get gopkg.in/go-playground/assert.v1
```

更新安装
```
$ go get -u gopkg.in/go-playground/assert.v1
```

### 使用
```
import . "gopkg.in/go-playground/assert.v1"
```

### 示例
示例代码
```
package config

import (
    // 导入assert包
	. "gopkg.in/go-playground/assert.v1"
	"testing"
)

func TestConfig(t *testing.T) {
    // 断言String("key", "")返回值不为"hello"
	NotEqual(t, String("key", ""), "hello")

	Equal(t, String("key1", ""), "hello")
	Equal(t, String("key2", ""), "world")

	Equal(t, Int("keyInt1"), 3)
	Equal(t, Int("keyInt2"), 4)

	Equal(t, Bool("keyBool1"), false)
	Equal(t, Bool("keyBool2"), true)

	Equal(t, Float("keyFloat1"), 2.71828)
	Equal(t, Float("keyFloat2"), 3.1415926)
}

```

运行测试
```
$ go test
PASS
ok  	github.com/alenstar/nanoweb/config	0.001s

```
