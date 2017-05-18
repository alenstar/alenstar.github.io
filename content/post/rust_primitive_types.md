+++
categories = ["y"]
date = "2017-05-15T22:10:40+08:00"
description = "Rust 有一系列被认为是“原生”的类型。这意味着它们是内建在语言中的。Rust被构建为在标准库中也提供了一些建立在这些类型之上的有用的类型，不过它们也大部分是原生的。"
tags = ["rust", "development"]
title = "Rust 原生类型"

+++

## 布尔型 bool

bool型只有两种值, `true` or `false` :

```
let x = true；// 声明不可变绑定x, rust自动推导出类型为bool型 rust以 ';' 表示一个表达式结束
let y: bool = false；// 声明bool型不可变绑定y
```

## char

`char` 类型代表一个单独的 Unicode 字符的值。你可以用单引号（ `'` ）创建 `char` ：

```
let x = 'x';
let unicode = '\u{fe0f}';
```
不像其它语言，这意味着Rust的 `char` 并不是 1 个字节，而是 4 个。

### 数字类型

Rust有一些分类的大量数字类型：有符号和无符号，定长和变长，浮点和整型。

> * i8      有符号8位整型  
> * i16     有符号16位整型  
> * i32     有符号32位整型  
> * i64     有符号64位整型  
> * u8      无符号8位整型  
> * u16     无符号16位整型  
> * u32     无符号32位整型  
> * u64     无符号64位整型  
> * isize   有符号size整型  
> * usize   无符号size整型  
> * f32     有符号单精度浮点型  
> * f64     有符号双精度浮点型  

`size` 是指可变大小类型, 如依赖机器的指针  

如果一个数字常量没有推断它类型的条件，它采用默认类型：

```
let x = 42; // `x` has type `i32`
let y = 1.0; // `y` has type `f64`
```

### 数组

一个定长相同类型的元素列表。数组默认是不可变的。

```
let a = [1,2,3]; // 长度为3的i32类型的数组 [i32; 3]
let mut m = [1,2,3]；// 可变数组 [i32; 3]
```
数组的类型是[T; N]。在泛型部分的时候讨论这个T标记。N是一个编译时常量，代表数组的长度。

```
let a = [0, 20]; // [i32; 20]型数组, 长度20, 初始值0
println!("a has {} elements", a.len()); // a.len()获取数组长度
println!("the first element is: {}", a[0]); // 下标访问数组元素
println!("the second element is: {}", a[1]); // 
```

### 切片 (Slices)

一个切片（slice）是一个数组的引用（或者“视图”）。它有利于安全，有效的访问数组的一部分而不用进行拷贝。比如，你可能只想要引用读入到内存的文件中的一行。原理上，切片并不是直接创建的，而是引用一个已经存在的变量。切片有预定义的长度，可以是可变也可以是不可变的。

##### 切片语法（Slicing syntax）

你可以用一个 `&` 和 `[]` 的组合从多种数据类型创建一个切片。`&` 表明切片类似于引用。带有一个范围的 `[]` ，允许你定义切片的长度：

```
let a = [0,1,2,3,4];
let complete = &a[..];  // 包含所有元素的切片
let middle = &a[1..4]; // 只包含a[1],a[2],a[3]三个元素的切片. 可以看做[1, 4)区间
```

切片用有&[T]类型.


