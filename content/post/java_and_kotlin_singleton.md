+++
categories = ["y"]
date = "2017-05-27T14:52:02+08:00"
description = "还在为实现单例而纠结吗？， 来用kotlin吧， 简单的关键字就能实现单例。"
tags = ["java", "kotlin"]
title = "Java 和 Kotlin 单例实现"

+++

## Java

Java中实现单例，我们可以有很多种实现方法，但是这给程序员带来了额外的负担，不仅要考虑线程安全还要考虑效率问题。

### 1, 懒汉实现， 线程不安全

```
public class Singleton {  
    private static Singleton instance;  
    private Singleton (){}  // 隐藏构造方法
    public static Singleton getInstance() {  
        if (instance == null) {  
            instance = new Singleton();  
        }  
        return instance;  
    }  
}  
```

### 2, 懒汉实现， 线程安全

```
public class Singleton {  
    private static Singleton instance;  
    private Singleton (){}  
    // 使用synchronized来实现线程同步， 影响效率
    public static synchronized Singleton getInstance() {  
        if (instance == null) {  
            instance = new Singleton();  
        }  
        return instance;  
    }  
} 

// 或者这样
public class Singleton {  
    private Singleton instance = null;  
    static {  
        instance = new Singleton();  
    }  
    private Singleton (){}  
    public static Singleton getInstance() {  
        return this.instance;  
    }  
}  
```

### 3, 饿汉实现

```
public class Singleton { 
    // class加载（ClassLoader）时实例化避免线程同步问题 
    private static Singleton instance = new Singleton(); 
    private Singleton (){}  
    public static Singleton getInstance() {  
        return instance;  
    }  
}  
```

### 4, 静态内部类

```
public class Singleton {  
    private static class SingletonHolder {  
        private static final Singleton INSTANCE = new Singleton();  
    }  
    private Singleton (){}  
    public static final Singleton getInstance() {  
        // 调用getInstance时加载SingletonHolder实例化Singleton
        return SingletonHolder.INSTANCE;  
    }  
}  
```

### 5, 双重校验锁

```
public class Singleton {  
    private volatile static Singleton singleton;  
    private Singleton (){}  
    public static Singleton getSingleton() {  
    if (singleton == null) {  
        synchronized (Singleton.class) {  // 实例化时同步，减少同步开销
            if (singleton == null) {  
                singleton = new Singleton();  
            }  
        }  
    }  
        return singleton;  
    }  
}
```

### 6, 枚举

JVM会保证enum不能被反射并且构造器方法只执行一次

```
public class EnumSingleton{
    private EnumSingleton(){}
    public static EnumSingleton getInstance(){
        return Singleton.INSTANCE.getInstance();
    }
    
    private static enum Singleton{
        INSTANCE;
        
        private EnumSingleton singleton;
        //JVM会保证此方法绝对只调用一次
        private Singleton(){
            singleton = new EnumSingleton();
        }
        public EnumSingleton getInstance(){
            return singleton;
        }
    }
}
```

## Kotlin

Kotlin中没有 `静态属性` 和 `静态方法` ，但有关键字 `object` 和 `companion` （伴生对象 companion object）。

`object` 修饰类的时候，该类是单例对象。

```
/**
 * 使用object定义类，该类的实例即为单例，访问单例直接使用类名，
 * 不能通过构造函数进行访问，不允许有构造函数
 * Singleton.doSomething() // 访问单例对象
 */
object Singleton {
    fun doSomething() {
        println("doSomething")
    }
}


/**
 * 实例化的时候，单例是懒加载，当使用的时候才去加载；而对象表达式是在初始化的地方去加载。
 *
 * 当在类内部使用 object 关键词定义对象时，允许直接通过外部类的类名访问内部对象进
 * 而访问其相关属性和方法，相当于静态变量
 * 可以使用companion修饰单例，则访问其属性或方法时，允许省略单例名
 * SingletonClass.doSomething() // 访问内部单例对象方法
 */
class Singleton {
    companion object {
        fun doSomething() {
            println("doSomething")
        }
    }
}
```

可以看出kotlin实现单例要简单得多