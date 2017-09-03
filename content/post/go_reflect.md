+++
categories = ["y"]
date = "2017-09-03T14:33:09+08:00"
description = "使用反射复制结构体"
tags = ["go"]
title = "go 反射应用-结构体复制"

+++

1. 实例代码

```
package main

import (
	"errors"
	"fmt"
	"reflect"
)

type People struct{
    Age int
    Name string
    Hobby []string
    Tags map[string]string
}
    
func reflectCopy(dst, src reflect.Value) error {
	if dst.Kind() == src.Kind() {
		//if dst.CanSet() { // 对于复杂类型(map slice 等)会直接拷贝引用地址
        //    dst.Set(src)
        /*} else*/ {
            switch dst.Kind() {
            //case reflect.Invalid:
                // not thing todo
            //case reflect.Int, reflect.Int8, reflect.Int16:
                // not thing todo
            //case reflect.Uint, reflect.Uint8, reflect.Uint16:
                // not thing todo
            //case reflect.Bool:
                // not thing todo
            //case reflect.String:
                // not thing todo
            case reflect.Slice: // 深拷贝
                dst.Set(reflect.MakeSlice(src.Type(), src.Len(), src.Cap()))
                for i := 0; i < src.Len(); i++ {
                    reflectCopy(dst.Index(i), src.Index(i))
                }
            case reflect.Map: // 深拷贝
                dst.Set(reflect.MakeMap(src.Type()))
                keys := src.MapKeys()
                if keys != nil {
                    for i := 0; i < len(keys); i++ {
                        value := src.MapIndex(keys[i])
                        dst.SetMapIndex(keys[i], value)
                    }
                }
            //case reflect.Chan, reflect.Func, reflect.Ptr:
                // not thing todo
            case reflect.Struct:
                return reflectCopy(dst, src)
            default: // reflect.Array, reflect.Struct, reflect.Interface
                // not thing todo
                if dst.CanSet() {
                    dst.Set(src)
                }
            }
        }
	} else {
		return errors.New("not support")
	}
	return nil
}

func findField(face interface{}, name string) (reflect.Value, error) {
	val := reflect.ValueOf(face).Elem()
	if val.Kind() != reflect.Struct {
		return val, errors.New("not support")
	}
	return val.FieldByName(name), nil
}

func StructCopy(p interface{}, f interface{}) {
	val := reflect.ValueOf(p).Elem()
	for i := 0; i < val.NumField(); i++ {
		valueField := val.Field(i)

		v, e := findField(f, val.Type().Field(i).Name)
		if e != nil {
			fmt.Println(fmt.Sprintf("Warn: the %s field not found", val.Type().Field(i).Name))
		} else {
			e = reflectCopy(v, valueField)
			if e != nil {
				fmt.Println("Warn: reflectCopy:", e.Error())
			}
		}
	}
}

func main() {
    type Man struct{
        Age int
        Name string
        Hobby []string
        Tags map[string]string
    }
    tags := make(map[string]string)
    tags["xxx"] = "111"
    tags["222"] = "zzz"
    m := &Man{
        Age: 9,
        Name: "bob",
        Hobby: []string{"a", "b", "c"},
        Tags: tags,
    }
    p := &People{}
    StructCopy(m, p)
    fmt.Println(m)
    fmt.Println(p)
    
    tags["www"] = "3333"
    m.Hobby[0] = "o"
    fmt.Println(m)
    fmt.Println(p)
}
```

2. 输出结果

```
&{9 bob [a b c] map[xxx:111 222:zzz]} # 源结构体
&{9 bob [a b c] map[xxx:111 222:zzz]} # 复制结果
&{9 bob [o b c] map[xxx:111 222:zzz www:3333]} # 修改原结构体字段
&{9 bob [a b c] map[xxx:111 222:zzz]} # 保持不便
```