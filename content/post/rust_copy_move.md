+++
categories = ["y"]
date = "2017-08-02T14:55:36+08:00"
description = ""
tags = ["rust"]
title = "Rust 移动语义和拷贝语义"

+++

Rust 函数调用时传参和变量绑定时默认使用移动语义 `move` ， 只有实现 `Copy` trait 时才进行拷贝。
在Rust中只有基本类型和少数结构实现了 `Copy` ，其他自定义结构需要自己来实现。

```

// Copy 继承自 Clone
// 注释掉编译会出错， 
#[derive(Copy, Clone)]
pub struct S {
    flag: bool,
    value: i32,
}

impl S {
    fn new() -> S {
        S {
            flag: false,
            value: 0,
        }
    }
    fn set_flag(&mut self, ok: bool) {
        self.flag = ok;
    }

    fn set_value(&mut self, value: i32) {
        self.value = value;
    }

    fn print(&self) {
        println!("{:?} {:?}", self.flag, self.value);
    }
}

fn main() {
    let set_flag = |mut s: S| { s.set_flag(true); };
    let mut s = S::new();
    // 自动 copy s ， 机使用 Copy 语义
    set_flag(s);
    s.print();

    let mut s = S::new();
    s.print();
}


```
