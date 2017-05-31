+++
categories = ["y"]
date = "2017-05-14T07:48:00+08:00"
description = "std::bind, std::function 和 lambda表达式, 这一系列函数可以极大地提高c++编程效率. "
tags = ["c/c++"]
title = "C++11 bind function & lambda expressions"

+++

在C++中，可调用实体主要包括函数，函数指针，函数引用，可以隐式转换为函数指定的对象，或者实现了opetator()的对象（即C++98中的functor)。C++0x中，新增加了一个std::function对象，std::function对象是对C++中现有的可调用实体的一种类型安全的包裹(函数指针这类可调用实体，是类型不安全的)。

在学习之前, 我们先要知道什么是闭包(closure):  
在一些语言中，在函数中可以（嵌套）定义另一个函数时，如果内部的函数引用了外部的函数的变量，则可能产生闭包。运行时，一旦外部的 函数被执行，一个闭包就形成了，闭包中包含了内部函数的代码，以及所需外部函数中的变量的引用。其中所引用的变量称作上值(upvalue)。

---

# std::bind & std::function
std::function是一种通用、多态的函数封装。std::function的实例可以对任何可以调用的目标实体进行存储、复制、和调用操作，这些目标实体包括普通函数、Lambda表达式、函数指针、以及其它函数对象等。std::function对象是对C++中现有的可调用实体的一种类型安全的包裹(函数指针这类可调用实体，是类型不安全的)。

通常std::function是一个函数对象类，它包装其它任意的函数对象，被包装的函数对象具有类型为T1, …,TN的N个参数，并且返回一个可转换到R类型的值。std::function使用 模板转换构造函数接收被包装的函数对象；特别是，闭包类型可以隐式地转换为std::function。

使用它们可以实现类似函数指针的功能。std::function可以绑定到全局函数/类静态成员函数(类静态成员函数与全局函数没有区别),如果要绑定到类的非静态成员函数，则需要使用std::bind。

### 示例代码
```
#include <functional>
#include <iostream>
using namespace std;

std::function< int(int)> Functional;

// 普通函数
int TestFunc(int a)
{
    return a;
}

// Lambda表达式
auto lambda = [](int a)->int{ return a; };

// 仿函数(functor)
class Functor
{
public:
    int operator()(int a)
    {
        return a;
    }
};

// 1.类成员函数
// 2.类静态函数
class TestClass
{
public:
    int ClassMember(int a) { return a; }
    static int StaticMember(int a) { return a; }
};

int main()
{
    // 普通函数
    Functional = TestFunc;
    int result = Functional(10);
    cout << "普通函数："<< result << endl;

    // Lambda表达式
    Functional = lambda;
    result = Functional(20);
    cout << "Lambda表达式："<< result << endl;

    // 仿函数
    Functor testFunctor;
    Functional = testFunctor;
    result = Functional(30);
    cout << "仿函数："<< result << endl;

    // 类成员函数
    TestClass testObj;
    Functional = std::bind(
        &TestClass::ClassMember, // 非静态成员函数
        testObj,                 // 对象指针
        std::placeholders::_1    // 形参站位符, 可以用来改变形参顺序, 
                                 // 如  std::placeholders::_1,  std::placeholders::_3 ,  std::placeholders::_2
    );
    result = Functional(40);
    cout << "类成员函数："<< result << endl;

    // 类静态函数
    Functional = TestClass::StaticMember;
    result = Functional(50);
    cout << "类静态函数："<< result << endl;

    return 0;
}
```

### 注意事项
关于可调用实体转换为std::function对象需要遵守以下两条原则：

> 转换后的std::function对象的参数能转换为可调用实体的参数；  
> 可调用实体的返回值能转换为std::function对象的返回值。

std::function对象最大的用处就是在实现函数回调，使用者需要注意，它不能被用来检查相等或者不相等，但是可以与NULL或者nullptr进行比较。



# lambda expressions
lambda可以很方便地实现std::function, 也是用来实现closure的东东, 它的最大用途也是在回调函数.

#### 语法(syntax)
> [](){} // 最基本的lambda表达式

> []: 捕获列表

> (): 形参列表, ()->int 这是显示声明返回值类型, lambda可以自动推导出返回类型, 一般可不写

> {}: 函数体

#### 捕获列表
> []      // 沒有定义任何变量。使用未定义变量会引发错误。  
> [x, &y] // x以传值方式传入（默认），y以引用方式传入。  
> [&]     // 任何被使用到的外部变量都隐式地以引用方式加以引用。  
> [=]     // 任何被使用到的外部变量都隐式地以传值方式加以引用。  
> [&, x]  // x显式地以传值方式加以引用。其余变量以引用方式加以引用。  
> [=, &z] // z显式地以引用方式加以引用。其余变量以传值方式加以引用。  

#### 示例
```
[](int x, int y) { return x + y; } //自动推出返回值类型为int

[](int x, int y) -> int { int z = x + y; return z + x; } //声明返回值类型为int

// closure实现
std::vector<int> someList;
int total = 0;
std::for_each(someList.begin(), someList.end(),
    [&total](int x) { // 以引用的方式捕获total(外部变量)
        total += x;   // 修改外部变量
    }
);
std::cout << total;

// 配合auto, 我们也可以这样写
auto myLambdaFunc = [this]() { this->SomePrivateMemberFunction(); }; //捕获this指针
auto myOnheapLambdaFunc = new auto([=] { /*...*/ }); // 以值传递方式捕获其它外部变量

```
