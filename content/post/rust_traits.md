+++
categories = ["y"]
date = "2017-07-20T13:43:27+08:00"
description = "c++中我们使用virtual虚函数来实现抽象，在Rust中使用 trait特征 来实现抽象。"
tags = ["rust"]
title = "Rust traits"

+++


1. 定义一个 `triat`

```
pub trait Print {
    fn print(&self); // 必须实现
    fn printex(&self) {} // 可以不实现
}
```

我们定义了 `triat` Print， 它有两个方法 `print` 和 `printex` ， 其中 `print` 是必须被实现的。

2. 实现特征 Print

```
// 定义结构 Node
pub struct Node {
    x: i32,
    y: i32,
    w: u32,
    h: u32,
}

// 实现 Print 特征
impl Print for Node {
    fn print(&self) {
        println!("print: {} {} {} {}", self.x, self.y, self.w, self.h);
    }
}

// 实现 new 方法 (rust没有构造方法， new 是约定的)
impl Node {
    fn new(w: u32, h: u32) -> Node {
        Node {
            x: 0,
            y: 0,
            w: w,
            h: h,
        }
    }
}

fn main() {
    // 构造 Node 对象， 调用 print 方法
    Node::new(4,6).print();
}
```

> 输出
```
$ print: 0 0 4 6
```  


3. 实现 `Display` 特征

Rust 能够很方便的将结构格式化输出， 这个功能也是 `triat` 的一种实践。

在没有为 Node 实现 `DIsplay` 前， 我们使用 `println!("{}", node);` 尝试输出Node的值:

>
```
   |     println!("{}", node);
   |                    ^^^^ the trait `std::fmt::Display` is not implemented for `Node`
   |
   = note: `Node` cannot be formatted with the default formatter; try using `:?` instead if you are using a format string
   = note: required by `std::fmt::Display::fmt`
```
可以看到编译器提示 Node 没有实现 `std::fmt::Display` 的错误。


```
// 引入fmt
use std::fmt;

// 实现 `Display`
impl fmt::Display for Node {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // 格式化
        write!(f, "{} {} {} {}", self.x, self.y, self.w, self.h)
    }
}
fn main() {
    let node = Node {
        x: 1,
        y: 2,
        w: 3,
        h: 4,
    };
    println!("{}", node);
}
```
我们实现 `std::fmt::Display` 后， 再次编译通过， 运行后输出:
> $ 1 2 3 4

4. 为内置类型添加新功能

通过 `triat` 我们可以很方便的为第三方结构实现新的功能。

```
// 定义 `trait` Float 用于转换xx 到 `f64` 或 `f32`
pub trait Float {
    fn to_f64(&self) -> f64;
    fn to_f32(&self) -> f32;
}

// 为 Duration 实现 Float
impl Float for Duration {
    fn to_f64(&self) -> f64 {
        self.as_secs() as f64 + self.subsec_nanos() as f64 * 0.000000001
    }
    fn to_f32(&self) -> f32 {
        self.as_secs() as f32 + self.subsec_nanos() as f32 * 0.000000001
    }
}

```

```
use std::time::{Duration, SystemTime};
use std::thread::sleep;

fn main() {
    let now = SystemTime::now(); // 保存当前时间
    let one_sec = Duration::from_secs(1); // 1秒
    sleep(one_sec); // 睡眠1秒
    let d = now.elapsed().unwrap(); // 到现在经历的时间
    println!("{} {}", d.to_f32(), d.to_f64()); // 转成浮点数输出
}
```

> 输出:
```
$ 1.0003068 1.000306875
```


5. 使用内置的 `trait`

Rust内置了很多 `trait` ，我们可以方便的 `derive` 获取， 而不用一个个地 `impl` 。

```
// 获取 Debug ， 这样就可以很方便地使用 `{:?}` 格式化输出了
#[derive(Debug)]
pub struct Node {
    x: i32,
    y: i32,
    w: u32,
    h: u32,
}
```

例如： `println("{:?}", Node::new(3,4))`

--------------

impl TraitXX for structXX

: 为 structXX 实现 特征 TraitXX 。


&self

: 调用对象本身的引用(不可变引用)， 它的类型是 `Self` 也就是本身的类型， 可变版本是 `&mut self`