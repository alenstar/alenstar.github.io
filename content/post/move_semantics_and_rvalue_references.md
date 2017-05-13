+++
categories = ["y"]
date = "2017-05-13T13:28:13+08:00"
description = "C++11发布已久, 然而对于很多新特性, 还不了解. 这次抽时间学习一下 移动语义和右值引用(T&&) "
tags = ["c/c++", "development"]
title = "C++11 移动语义和右值引用"

+++

以下内容引自[wikipedia](https://zh.wikipedia.org/wiki)

### 什么是右值?

在C++11提出右值引用之前，C++03及更早的C++标准中，表达式的“值分类”（value categories）属性为左值或右值。

左值是对应（refer to）内存中有确定存储地址的对象的表达式的值，而右值是所有不是左值的表达式的值。因而，右值可以是字面量、临时对象等表达式。能否被赋值不是区分C++左值与右值的依据。

---

C++的const左值是不可赋值的；而作为临时对象的右值可能允许被赋值。左值与右值的根本区别在于是否允许取地址&运算符获得对应的内存地址。
---

### 什么是右值引用?

作为一种追求执行效率的语言，C++在用临时对象或函数返回值给左值对象赋值时的深度拷贝（deep copy）一直受到诟病。考虑到临时对象的生命期仅在表达式中持续，如果把临时对象的内容直接移动（move）给被赋值的左值对象，效率改善将是显著的。这就是移动语义的来源。

与传统的拷贝赋值运算符（copy assignment）成员函数、拷贝构造（copy ctor）成员函数对应，移动语义需要有移动赋值（move assignment）成员函数、移动构造（move ctor）成员函数的实现机制。可以通过函数重载来确定是调用拷贝语义还是移动语义的实现。

右值引用就是为了实现移动语义与完美转发所需要而设计出来的新的数据类型。右值引用的实例对应于临时对象；右值引用并区别于左值引用，用作形参时能重载辨识（overload resolution）是调用拷贝语义还是移动语义的函数。

### std::forward

std::forward用途是：如果函数forward的实参的数据类型是左值引用，则返回类型为左值引用；如果函数forward的实参的数据类型是右值引用，则返回类型为右值引用，返回值的分类属于临终值(临终值对象既有存储地址因此可以绑定到右值引用变量上，而且它又是一个即将停止使用的对象可以被移走内容)，从而把参数的信息完整地传递给下一级被调用的函数。

从上述std::forward的定义实现来看，实参必须是个为左值的引用对象，但是实参的数据类型有两种可能：

> + 实参的数据类型T是左值引用类型，std::forward的返回类型T&&根据引用塌缩规则变为T&，即返回值仍为左值引用类型；
> + 实参的数据类型T是右值引用类型（这是因为右值引用类型的具名变量实际上表现为左值），std::forward的返回类型S&&根据引用塌缩规则变为S&&，即返回值为右值引用类型。


### std::move

std::move是个模板函数，把输入的左值或右值转换为右值引用类型的临终值。其核心是强制类型转换static_cast<Type&&>()语句。

### 示例测试 
代码:
```
#include <cstdio>
#include <iostream>
#include <vector>
#include <memory>

class Test{
	private:
		std::string _name;
	public:
		Test(const char* name):_name(name) {
			std::cout << std::string("constructor ") + std::string(_name) << std::endl;
		}
		~Test() {
			std::cout << std::string("destructor ") + std::string(_name) << std::endl;
		}
		std::string& print() {
			return _name;
		}
};

int main(int argc, const char** argv) {
	std::cout << "teset begin" << std::endl;
	std::cout<<std::endl;

	auto testA = std::make_shared<Test>("test a");
	auto testB = std::make_shared<Test>("test b");
	auto testC = std::make_shared<Test>("test c");
	{
	std::vector<std::shared_ptr<Test>> list;

	list.push_back(testA);

	// 无条件转换成右值引用
	list.push_back(std::move(testB));

	// forward 有条件转换
	list.push_back(std::forward<std::shared_ptr<Test>>(testC));
	list.push_back(std::forward<std::shared_ptr<Test>>(std::make_shared<Test>("test d")));
	list.push_back(std::forward<std::shared_ptr<Test>&&>(std::make_shared<Test>("test e")));
	}

	std::cout<<std::endl;
	std::cout << "list life end" << std::endl;

	std::cout << "teset end" << std::endl;
	std::cout<<std::endl;
	return 0;
}
```

运行输出:
```
g++ test.cpp
./a.out

teset begin

constructor test a
constructor test b
constructor test c
constructor test d
destructor test b
destructor test c
destructor test d

list life end
teset end

destructor test a
```
从结果可以看出, 使用std::move或std::forward后, 对象转移到容器内部, 容器销毁时对象跟着销毁, 此时shared_ptr对象失效, 成为无效对象(nullptr).