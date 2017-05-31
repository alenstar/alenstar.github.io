+++
categories = ["y"]
date = "2017-05-13T20:42:57+08:00"
description = "Rust 是一种系统编程语言。 它具有惊人的运行速度，能够防止程序错误，并保证了线程安全。"
tags = ["rust"]
title = "Rust开发环境搭建"

+++

### 1. 安装 Rust
```
curl https://sh.rustup.rs -sSf | sh
```

### 2. 配置环境变量
在 Rust 开发环境中，所有工具都安装到 ~/.cargo/bin 目录， 并且您能够在这里找到 Rust 工具链，包括 rustc、cargo 及 rustup。

```
"export export PATH=$HOME/.cargo/bin:$PATH" >> ~/.bashrc
```

### 3. 第一个Rust程序

创建Rust源码文件

```
$ mkdir ~/projects
$ cd ~/projects
$ mkdir hello_world
$ cd hello_world
$ touch hello_world.rs
```

Rust版 hello world !

```
// 入口函数
fn main() {
    // println!输出并换行
    println!("Hello, world !");
}
```

编译及运行

```
$ rustc hello_world.rs
$ ./hello_world
Hello, world !
```

### 4. 使用Cargo管理项目

使用cargo new 创建一个新的rust项目

```
$ cd ~/projects
$ cargo new hello_cargo
    Created library `hello_cargo` project # 输出创建成的项目目录
```

cargo 项目目录结构

+ src 源文件目录
+ Cargo.toml 项目配置文件
+ target 编译输出目录

### 5. 使用Cargo构建项目

```
$ cd hello_cargo
$ touch src/main.rs
$ echo -e 'fn main() {\n\tprintln!("Hello, world !");\n}' >> src/main.rs
$ cargo build  # 构建成后输出编译结果到target目录下, 默认是debug模式构建, 编译产生的目标就在debug目录下
$ cargo build --release # 使用release模式构建

# 运行目标程序
$ ./target/release|debug/hello_wrold
Hello, world !

# 或者

$ cargo run
    Finished debug [unoptimized + debuginfo] target(s) in 0.0 secs
     Running `target/debug/hello_cargo`
Hello, world !


```