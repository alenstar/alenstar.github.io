+++
categories = ["y"]
date = "2017-05-14T08:39:43+08:00"
description = "c++11 的推出, 带来了一系列新特性, 如auto自动类型推导, std::tuple元组"
tags = ["c/c++"]
title = "C++11 类型推导和元组"

+++

# 类型推导

在标准C++和C，使用参数必须明确的指出其类型。然而，随着模版类型的出现以及模板元编程的技巧，某物的类型，特别是函数定义明确的回返类型，就不容易表示。在这样的情况下，将中间结果存储于参数是件困难的事，可能会需要知道特定的元编程程序库的内部情况。

auto关键字可以推导出类型, 方便编程
```
#include <vector>

int main()
{
  const std::vector<int> v(1);
  auto a = v[0]；// a為int型別
  decltype（v[0]) b = 0;   // b為const int&型別，即
                      // std::vector<int>::operator[]（size_type）const的回返型別
  auto c = 0;         // c為int型別
  auto d = c;         // d為int型別      
  decltype(c) e;      // e為int型別，c實體的型別 
  decltype((c)) f = e; // f為int&型別，因為（c）是左值
  decltype(0) g;      // g為int型別，因為0是右值
}
```

# std::tuple元组
std::pair 可以打包最多两个值到一个类里,常用在需要返回两个值的函数里,因为可以不需要自己定义一个wrapper类,普通集合类肯定不能用,因为C++的集合只能存储泛型的(相同类型)对象. 如果要存储超过2个不同类型的对象, 可以使用 std::tuple, 它能存储最多10个不同对象类型.

std::tuple是一个类模板,它能存储固定大小的(10个 vs2010)不同类型对象,它是std::pair的泛化类型.

std::tuple 也可以结合std::tie 来接收函数返回时 unpack 集合里的元素.

```
typedef std::tuple <int, double, long &, const char *> test_tuple;
long lengthy = 12;
test_tuple proof (18, 6.5, lengthy, "Ciao!");

lengthy = std::get<0>(proof);  // 將proof的第一個元素賦值給lengthy（索引從零開始起跳）
std::get<3>(proof) = " Beautiful!";  // 修改proof的第四個元素

std::tuple<int, int> foo_tuple() 
{
  return {1, -1};  // Error until C++17
  return std::make_tuple(1, -1); // Always works
}

```
### std::tie 解元组
```
#include <tuple>
#include <iostream>
#include <string>
#include <stdexcept>
 
std::tuple<double, char, std::string> get_student(int id)
{
    if (id == 0) return std::make_tuple(3.8, 'A', "Lisa Simpson");
    if (id == 1) return std::make_tuple(2.9, 'C', "Milhouse Van Houten");
    if (id == 2) return std::make_tuple(1.7, 'D', "Ralph Wiggum");
    throw std::invalid_argument("id");
}
 
int main()
{
    auto student0 = get_student(0);
    std::cout << "ID: 0, "
              << "GPA: " << std::get<0>(student0) << ", "
              << "grade: " << std::get<1>(student0) << ", "
              << "name: " << std::get<2>(student0) << '\n';
 
    double gpa1;
    char grade1;
    std::string name1;
    std::tie(gpa1, grade1, name1) = get_student(1); // 解元组
    std::cout << "ID: 1, "
              << "GPA: " << gpa1 << ", "
              << "grade: " << grade1 << ", "
              << "name: " << name1 << '\n';
}
```