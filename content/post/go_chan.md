+++
categories = ["y"]
date = "2017-06-21T17:49:45+08:00"
description = "go提供channel， 使用channel可以方便的在goroutine中同步数据"
tags = ["go"]
title = "go channel 使用总结"

+++

go中channel的声明使用chan关键字， 后面接chan中可以存入的类型; 对channel的操作使用 `<-` (读) 和 `->` (写)  


### 创建channel  
1. 无缓冲的channel `c ：= make(chan string)`  
2. 有缓冲的channel `c := make(chan string, 2)` , make的第二个参数说明缓冲的大小  


### 读取和写入channel  
1. 读取  

```
c ：= make(chan string)
val := <- c
```

2. 写入  

```
c ：= make(chan string)
c <- “value”
```

### 使用select读写channel  
select每次只执行一条case语句, 当没有case语句可执行时（即channel中没有数据或者channel已经写满），就执行default语句。  

```
    c ：= make(chan string)
    
    // 写入
	select {
	case c <- time.Now().String():
	default:
		fmt.Println("chan full")
	}
    
    // 读取
    select {
	case s := <- c:
		fmt.Println(s)
	default:
		fmt.Println("chan empty")
	}
```

```
// ok
func test1() {
	c := make(chan string)
	go func() {
		c <- time.Now().String()
	}()
	fmt.Println(<-c)
}
```

```
// ok
func test2() {
	c := make(chan string)
	go func() {
        fmt.Println(<-c)
	}()
	c <- time.Now().String()
}
```

```
// chan full
// chan empty
func test3() {
	c := make(chan string)
	select {
	case c <- time.Now().String():
		// TODO
	default:
		fmt.Println("chan full")
	}
    
    select {
	case s := <- c:
		fmt.Println(s)
	default:
		fmt.Println("chan empty")
	}
}
```

```
// fatal error: all goroutines are asleep - deadlock!
func test4() {
	c := make(chan string)
	c <- time.Now().String()
	fmt.Println(<-c)
}
```

```
// fatal error: all goroutines are asleep - deadlock!
func test5() {
	c := make(chan string)
	select {
	case c <- time.Now().String():
		// TODO
	default:
		fmt.Println("chan full")
	}
	fmt.Println(<-c)
}
```

```
// ok
func test6() {
	c := make(chan string, 1)
	c <- time.Now().String()
	fmt.Println(<-c)
}
```

```
// ok
func test7() {
	c := make(chan string, 1)
	select {
	case c <- time.Now().String():
		// TODO
	default:
		fmt.Println("chan full")
	}
	fmt.Println(<-c)
}
```

```
// fatal error: all goroutines are asleep - deadlock!
func test8() {
	c := make(chan string, 1)
	c <- time.Now().String()
    c <- time.Now().String()
	fmt.Println(<-c)
}
```

```
// chan full 2
func test9() {
	c := make(chan string, 1)
	select {
	case c <- time.Now().String():
		// TODO
	default:
		fmt.Println("chan full 1")
	}
    select {
	case c <- time.Now().String():
		// TODO
	default:
		fmt.Println("chan full 2")
	}
	fmt.Println(<-c)
}
```

```
//  all goroutines are asleep - deadlock!
func test10() {
	c := make(chan string, 1)
	c <- time.Now().String()
    select {
    case s := <-c:
        fmt.Println(s) // ok
    default:
        fmt.Println("chan empty")
    }
	fmt.Println(<-c) // fatal error
}
```

```
// chan empty 2
func test11() {
	c := make(chan string, 1)
	c <- time.Now().String()
    select {
    case s := <-c:
        fmt.Println(s) // ok
    default:
        fmt.Println("chan empty 1")
    }
    select {
    case s := <-c:
        fmt.Println(s) // ok
    default:
        fmt.Println("chan empty 2")
    }
}
```