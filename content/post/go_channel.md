+++
categories = ["y"]
date = "2017-06-21T17:49:45+08:00"
description = "go提供channel， 使用channel可以方便的在goroutine中同步数据"
tags = ["go"]
title = "go channel 使用总结"

+++

go中channel的声明使用chan关键字， 后面接chan中可以存入的类型; 对channel的操作使用 `<-` (读) 和 `->` (写), 注意在go中  `<-` 和 `->` 是同步操作， 这意味着它会阻塞后面的操作， 而且有时使用不当还会出现死锁问题。


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
可以认为select去查询是否有case语句可执行， 没有就进入default执行。  

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

### 使用示例及死锁问题分析  

创建一个无缓冲的channel， go一个协程来写channel，在主协程中读channel， 此时程序正常运行，即channel有机会被写入和读取  

```
// ok
func test1() {
    c := make(chan string)
    go func() {
        // time.Sleep(time.Second * 3) 等待一定时间也不会出错
        c <- time.Now().String()
    }()
    fmt.Println(<-c)
}
```

创建一个无缓冲的channel， go一个协程来读channel，在主协程中写channel， 此时程序正常运行，和test1一样

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

创建一个无缓冲的channel，在第一个select中写channel， 此时没有读端（读channel的协程）select直接进入default语句（可以认为此时channel已经满了）执行; 在第二个select中读channel， 同样此时没有写端（写channel的协程）select直接进入default语句（可以认为此时channel已经空了）执行. 

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

创建一个无缓冲的channel，在主协程中写channel， 之后读channel。 由于channel的读写是同步操作， 在写channel时， 没有读端， 导致主协程一直处于写入channel状态， 后面的语句得不到执行机会， go的runtime经过一系列检测认为此时主协程出现死锁问题而强行结束程序并提示死锁问题。  

```
// fatal error: all goroutines are asleep - deadlock!
func test4() {
    c := make(chan string)
    c <- time.Now().String()
    fmt.Println(<-c)
}
```

即使我们改用select来读或写channel， 死锁问题依旧， select只是提供channel读写状态的检查， 并不能解决应为读写不对称而引发的死锁问题。

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

创建一个有缓冲的channel， 由于缓冲的存在channel的写入操作很容易就完成了（数据直接写入channel的内部缓冲里， 只要缓冲没有写满或读空channel的读写操作都是立即完成的）。 

```
// ok
func test6() {
    c := make(chan string, 1)
    c <- time.Now().String()
    fmt.Println(<-c)
}
```

在使用select时， 同样有缓冲的channel在没有写满或读空时都是先执行case语句的， 只有在写满后读空时才会进入default语句。  

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

在这个例子中， channel的缓冲大小为1（只能缓冲一条消息）， 当我们第一次向channel中写入时， channel缓冲为空， 可以写入， 第二次写入时， 由于第一次写入的消息还没被读出， channel的缓冲处于满的状态， 导致第二次的写入一直处于阻塞状态， 此时就出现死锁问题。 

```
// fatal error: all goroutines are asleep - deadlock!
func test8() {
    c := make(chan string, 1)
    c <- time.Now().String()
    c <- time.Now().String()
    fmt.Println(<-c)
}
```

这次我们试着用select来对channel进行写入操作， 第一次成功了， 第二次可以看到channel已经满了。 

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

同样， 我们直接向channel中写入， 再用select读出， 一切都很正常， 当我们再次直接读取时， 可以看到程序退出了并提示死锁， 应为channel已经空了， 我们永远不可能再读到数据了。  

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

这次我们用select试试， select很明确的告诉我们channel已经空了。  

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
        fmt.Println(s) 
    default:
        fmt.Println("chan empty 2")
    }
}
```

这次我们用select来控制读写channel， 可以看到写入成功了，在经过三秒后第二个select语句执行了 `case <-time.After(time.Second * 3)` 这条case语句， 由于 `<-time.After(time.Second * 3)` 的读取是可以到达的， 程序没有出现死锁问题。 如果我们把default语句也加与第二个select中会怎么样呢？  可以看到第二条select直接执行了default语句， 这是由于当前cahnnel c 已经读空了， 而 `<-time.After(time.Second * 3)` 此时还不可读（三秒后可读）， default的存在使的select不用等待其他channel可读写而直接执行default语句， 应为default无条件可读写的。    

```

// timeout 3s
func test12() {
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
        fmt.Println(s) 
    case <-time.After(time.Second * 3):
        fmt.Println("timeout 3s")
    //default:
    //  fmt.Println("chan empty 2")
    }
}
```


### 总结  
1. 合理安排channel的读写（最好成对出现）协程（不同的协程）可以有效避免死锁问题。  

2. 可以使用select来处理读空和写满问题， 减少死锁或阻塞问题的发生。  

3. 使用select集中管理多个channel的读写， 可以将channel相关问题集中起来方便处理， 通过 `case <-time.After(time.Second * 3):` 来设置select超时， 提高select的可控性。  

4. 在使用select进行超时处理时不要加default语句， 以免得不到想要的结果。  
