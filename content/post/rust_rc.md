+++
categories = ["y"]
date = "2017-08-02T14:03:20+08:00"
description = ""
tags = ["rust"]
title = "Rust Rc 和 Arc "

+++

std::rc::Rc<T> 一种单线程的引用计数指针(非安全)，它实现了 `Deref` （使用 Rc::get_mut(Rc<T>) 取得可变引用） ，及继承了 `T` 的方法。 

std::sync::Arc<T> 一种线程安全的引用计数指针，和 std::rc::Rc<T> 一样，实现了 `Deref` ，不同的是 std::sync::Arc<T> 可应在多线程下使用。 

1. Rc 基本使用

```
use std::rc::Rc;

pub struct S {
    flag: bool,
}

impl S {
    fn set(&mut self, ok: bool) {
        self.flag = ok;
    }

    fn print(&self) {
        println!("{:?}", self.flag);
    }
}

fn main() {
    let s: Rc<S> = Rc::new(S { flag: false });
    s.print(); // 直接访问 S.print() 方法
    println!("{:?}", s.flag); // 直接访问 S.flag 字段
}

```

2. 可变引用

使用 Rc::get_mut(Rc<T>) 可以取得可变引用

```
fn main() {
    // 可变绑定， 内部字段可变性从外部继承， Rc<S> 可变时， S 才可变
    let mut s: Rc<S> = Rc::new(S { flag: false });
    println!("{:?}", s.flag);
    // 取出可变引用， S.set(ok:bool) 要求 self 为可变引用( &mut )
    Rc::get_mut(&mut s).unwrap().set(true);
    s.print();
}

```

3. Clone

`Clone` triat 用来实现 `Rc` 的引用计数，需要编程人员自己来控制。 

```
fn main() {
    let s: Rc<S> = Rc::new(S { flag: false });
    println!("{:?}", s.flag);
    // 调用 clone 增加引用计数并获得一个引用副本; 前一个s被隐藏
    let s = s.clone();
    s.print();
}
```

4. Clone 与 Rc::get_mut

`Rc::get_mut` 要求 Rc<T> 只有一个时才可用

```
fn main() {
    // 可变绑定， 内部字段可变性从外部继承， Rc<S> 可变时， S 才可变
    let mut s: Rc<S> = Rc::new(S { flag: false });
    println!("{:?}", s.flag);
    // 调用 clone 增加引用计数并获得一个引用副本file:///opt/workspace/beego/src/github.com/alenstar/alenstar.github.io/content/post/rust_copy_move.md

    let mut s2 = s.clone();
    
    // 绑定一个闭包， 以 move 的方式捕获外部变量
    let move_s = move |s:Rc<S>| {s.print();};
    // move s 到闭包
    // move_s(s); // 去除注释， 程序可正常运行；应为s被移动到闭包内， 闭包处理结束后就销毁了，引用对象就只剩一个了
    
    // 取出可变引用， S.set(ok:bool) 要求 self 为可变引用( &mut )
    Rc::get_mut(&mut s2).unwrap().set(true); // panic, unwrap 返回 None, 此时存在两个引用
    s2.print();
}
}
```

