+++
categories = ["y"]
date = "2017-06-06T15:16:41+08:00"
description = "在Rust中， 错误处理使用模式匹配来解决， 避免了c中errno的局限性， 同时也没有c++中try...catch的额外开销"
tags = ["rust"]
title = "Rust 模式匹配和错误处理"

+++

### 什么时模式匹配（Pattern Match）？

汉语字典中对 `模式` 的解释是：事物的标准样式。
在计算机科学中，它指特定类型的数据（往往是序列或树形结构）满足某一特定结构或格式。
`匹配` 本身是指一个判断寻找过程。
最早的模式匹配用于文本编辑器中的正则字符串搜索，之后才作为编程语言特性。

模式匹配在计算机科学领域有两层意思。
其一，可以特指字符串匹配算法，例如为人熟知的 KMP 字符串匹配算法、命令行工具 grep 等。
其二，特指在一些语言中作为一种以结构的方式处理数据的工具，此时的匹配过程往往是树形匹配，与此相伴的往往还有一个特性叫 guard（守卫）。

Rust 中模式匹配随处可见，例如在 let 变量绑定语句、 match 匹配语句中等。
利用好模式匹配这一特性可以使代码更简洁易懂。
Rust 支持模式匹配中的变量绑定、结构体/元组解构、守卫条件判断、数值范围匹配等特性。

### 模式匹配能做什么？

1. 取代switch语句

rust 没有switch语句， 那么遇到多分支选择的情况又该怎么处理？

```
match number {
  0     => println!("zero"), // 匹配 number = 0， 相当于case 0：
  1 | 2 => println!("one or two"), // 匹配 1或者2
  3...10 => println!("three to ten"), // 匹配 3到10（闭区间）
  _     => println!("something else") // `_` 是通配符
}
```

2. 错误处理 Option

很多rust库通过返回Option或者Result来返回处理结果。

```
pub enum Option<T> {
 None, // 空， 可以用来表示null
 Some(T), // Some(...) 需要处理的结果
}
```

可以看到， 在Option结构中， 真正要处理的结果被装在Some中， 那么怎样取出Some中的内容呢？

```
match opt {
 Some(value) => println!("value = {}", value), // 取出value
 None => println!("Got None"), // 处理错误
}
```
有时为了方便， 我们不想处理错误的结果， 这时我们可以用 `unwarp` 函数来跳过（该崩溃的问题就让它崩溃吧）

```
impl<T> Option<T> {
 fn unwrap(self) -> T {
   match self {
   Option::Some(val) => val, // 取出val
   Option::None =>
   panic!("called `Option::unwrap()` on a `None` value"), // 出错直接panic掉
   }
 }
}
```

3. 错误处理 Result

Option虽然方便，但是出错时没有详细的提示（就知道 `None` ），Result提供更详细的错误提示。

```
enum Result<T, E> {
 Ok(T), // 取出结果T
 Err(E), // 取出错误信息E
}
```

### 如何使用？

Option<T>

```
fn my_option(number: i32) -> Option<i32> {
    match number {
        0 => Some(0),
        1 | 2 => Some(1),
        _ => None,
    }
}

println!("option {0}",
         match my_option(11) {
             None => -1, // 失败返回-1
             Some(x) => x, // 返回成功结果
         });
```

Result<T, E>

```
// `&'static str` 表示错误提示信息的生命周期是静态的
fn my_result(number: i32) -> Result<i32, &'static str> {
    match number {
        0 => Ok(0),
        1 | 2 => Ok(1),
        _ => Err("bad number"), // 返回错误提示
    }
}

println!("result {0}",
         match my_result(11) {
             Ok(x)=> x,
             Err(e) => {
             println!("Err {}", e); // 打印错误信息
                 -1 // 返回-1
             },
         });
```