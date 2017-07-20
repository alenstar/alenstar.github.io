+++
categories = ["y"]
date = "2017-07-20T12:26:19+08:00"
description = "通过 Deref 和 DerefMuf 的类型转换， 我们可以很容易地在Rust中实现和c++类似的继承"
tags = ["rust"]
title = "Rust Deref & DerefMuf 类型转换"

+++

1. 示例代码

```
// 引入 triats Deref DerefMut
use std::ops::{Deref, DerefMut}; 

#[derive(Debug)]
pub struct Node {
    x: i32,
    y: i32,
    w: u32,
    h: u32,
}
impl Node {
    fn new(w: u32, h: u32) -> Node {
        Node {
            x: 0,
            y: 0,
            w: w,
            h: h,
        }
    }
    fn get_position(&self) -> (i32, i32) {
        (self.x, self.y)
    }
    fn get_size(&self) -> (u32, u32) {
        (self.w, self.h)
    }
}

#[derive(Debug)]
pub struct Widget {
    node: Node, 
    label: String,
}

impl Widget {
    fn new(label: &str, w: u32, h: u32) -> Widget {
        Widget {
            node: Node {
                x: 0,
                y: 0,
                w: w,
                h: h,
            },
            label: label.to_string(),
        }
    }
    
    // 复写get_size方法
    fn get_size(&self) -> (u32, u32) {
        (self.w + 4, self.h + 4)
    }
}

// 为 Widget 实现 Deref 转换
impl Deref for Widget {
    type Target = Node; // 目标类型
    fn deref<'a>(&'a self) -> &'a Node {
        &self.node // 返回Node类型的引用
    }
}
// 为 Widget 实现 DerefMut 转换
impl DerefMut for Widget {
    fn deref_mut<'a>(&'a mut self) -> &'a mut Node {
        &mut self.node // 返回Node类型的可变引用
    }
}

fn main() {
    let widget = Widget::new("Cancel", 24, 64);
    println!("Widget {:?}", widget);
    // Widget类型中没有相应的属性时， 自动转换到Node类型，并访问Node的属性， 如果Node中也没有相应属性则失败
    println!("Widget {} {} {} {}", widget.x, widget.y, widget.w, widget.h); 
    // Widget没有实现 get_position 方法， 则自动转换到Node再调用 get_position 方法
    // Widget实现了 get_size 方法， 则直接调用
    println!("Widget {:?} {:?}", widget.get_position(), widget.get_size());

    let node = Node::new(24, 64);
    println!("Node {:?}", node);
    println!("Node {} {} {} {}", node.x, node.y, node.w, node.h);
    println!("Node {:?} {:?}", node.get_position(), node.get_size());
}

```

2. 输出结果

```
Widget Widget { node: Node { x: 0, y: 0, w: 24, h: 64 }, label: "Cancel" }
Widget 0 0 24 64
Widget (0, 0) (28, 68)
Node Node { x: 0, y: 0, w: 24, h: 64 }
Node 0 0 24 64
Node (0, 0) (24, 64)
```