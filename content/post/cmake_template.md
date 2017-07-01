+++
categories = ["y"]
date = "2017-07-01T16:17:33+08:00"
description = "cmake是跨平台的项目构建管理工具, 使用cmake可以方便的生成makefile文件来构建项目."
tags = ["linux"]
title = "cmake 入门学习"

+++


首先我们来看看我们的工程目录结构

```
$ tree myproject

myproject  # 工程目录
├── CMakeLists.txt # 入口CMakeLists.txt文件
├── example.c
├── include  # 头文件目录
│   ├── arch.h
│   ├── base.h
│   ├── common.h
│   └── data.h
├── LICENSE
├── README.md
└── src  # 源代码目录
    ├── arch.c
    ├── base.c
    ├── CMakeLists.txt  # 子CMakeLists.txt文件
    ├── common.c
    └── data.c
```

### 入口CMakeLists.txt文件分析

```
cmake_minimum_required(VERSION 2.8.7 FATAL_ERROR) # 设置最低cmake版本要求

project(myproject) # 设置项目名称

add_definitions(-DDEBUG) # 添加宏定义

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O0 -ggdb") // 设置CMAKE_C_FLAGS, `${CMAKE_C_FLAGS}` 可取出CMAKE_C_FLAGS的值

include_directories(src) # 添加include目录
include_directories(include) 

add_subdirectory(src) # 添加子目录, 子目录要包含CMakeLists.txt文件

add_executable(example example.c) # 添加可执行文件 example 的生成规则, 后面接依赖文件或者文件列表
target_link_libraries(example lib) # 设置可执行文件 example 的链接库, 后面接的可以是系统库, 也可以是 子目录下的自定义库

```

### 子CMakeLists.txt文件

```
cmake_minimum_required(VERSION 2.6) / cmake 版本要求
project(lib) # 项目名称

include_directories(./) # 设置包含目录( `./` 当前目录)

set(SRC_FILES arch.c base.c common.c data.c) # 设置文件列表SRC_FILES (自定义名称) 的文件内容( 包含的文件 )

add_library(lib STATIC ${SRC_FILES}) # 添加静态库 lib 的生成规则, 依赖 SRC_FILES
add_library(lib_shared SHARED ${SRC_FILES}) # 添加动态态库 lib 的生成规则, 依赖 SRC_FILES
```

### 构建项目

为了保持项目目录的干净, 我们一般会在build目录下进行构建

```
$ mkdir build # 创建构建目录
$ cd build # 进入构建目录
$ cmake .. # 从上级目录构建, 构建产生的临时文件和目标文件将在当前目录生成
$ make # 生成目标
```

### 添加 c++11 支持

添加一个编译器选项 `add_compile_options(-std=c++11) # CMake 2.8.12 or newer`  不过这种方式不够灵活

使用set来设置cmake内置变量

```
set(CMAKE_CXX_STANDARD 11) # C++11...
set(CMAKE_CXX_STANDARD_REQUIRED ON) #...is required...
set(CMAKE_CXX_EXTENSIONS OFF) #...without compiler extensions like gnu++11
```

为特定目标进行设置, `set_target_properties` 可以为要生成的目标设置属性 `PROPERTIES` 以实现不同目标的差异处理

```
set_target_properties(myTarget PROPERTIES
    CXX_STANDARD 11
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
)
```
