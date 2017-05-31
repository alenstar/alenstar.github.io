+++
categories = ["y"]
date = "2017-05-31T20:16:00+08:00"
description = "new 是c++的运算符, 它一般用来创建对象(分配内存空间和调用构造函数). 当我们需要在已经存在的内存上构造对象又该怎么做呢?"
tags = ["c/c++"]
title = "c++ placement new"

+++

大家都知道, 在c++里new是用来动态创建和初始化对象的, delete是用来销毁new创造的对象的.
使用new创建对象时,首先是分配对象使用的内存空间,然后调用构造函数完成对象的初始化.
delete时调用对象的析构函数, 然后释放内存.

如果我们想在已经存在的内存上构造对象那该在某些做呢?

`placement new` 正是可以实现我们的需求.

`placement new` 是用来在已经分配的内存上初始化对象用的, 无论是在 `堆` 还是 `桟` 都可以.

### 示例

```
#include <iostream>

class ClassT{
	public:
		ClassT(){
			std::cout << "constructor" << std::endl;
		}
		~ClassT(){
			std::cout << "destroyer" << std::endl;
		}
};

int main(int argc, const char** argv) {
	void* p1 = malloc(sizeof(ClassT)); // 分配堆内存
	ClassT* c1 = new (p1) ClassT(); // 在p1上构造对象

	char p2[sizeof(ClassT)]; // 分配桟内存
	ClassT* c2 = new (p2) ClassT(); // 在p2上构造对象

	c1->~ClassT(); // 手动调用析构函数
	c2->~ClassT(); // 手动调用析构函数

	std::cout<< "delete c1" << std::endl;
	delete c1; // 释放对象, 自动调用析构函数

	std::cout<< "delete c2" << std::endl;
	delete c2; // error c2使用的是桟空间, 离开作用域自动回收

	std::cout<< "free p1" << std::endl;
	free(p1); // error 内存已经释放

	return 0;
}
```

使用 `placement new` 时, 尽量手动调用析构函数, 内存释放应该又内存申请方管理和释放.

### 用途

1. 对象池

可以通过预分配内存空间, 减小开销, 使用时再用 `placement new` 初始化.