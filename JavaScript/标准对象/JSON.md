# JSON

JSON(JavaScript Object Notation)，它是一种数据交换格式。

在 JSON 中一共有以下这几种数据类型，

- number：和JavaScript的`number`完全一致；
- boolean：就是JavaScript的`true`或`false`；
- string：就是JavaScript的`string`；
- null：就是JavaScript的`null`；
- array：就是JavaScript的`Array`表示方式——`[]`；
- object：就是JavaScript的`{ ... }`表示方式。

以及上面的任意组合。还有几点需要注意，

1. JSON字符集必须是 UTF-8；
2. JSON的字符串必须用双引号；
3. Object 的键也必须用双引号；



## 序列化

将对象序列化成一个 JSON 格式的字符串。

```
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

var s = JSON.stringify(xiaoming);
console.log(s);
```

美化一下输出，

```
var s = JSON.stringify(xiaoming, null, '  ');
console.log(s);
```

其中，第二个参数用于控制如何筛选对象的键值，如果只想输出指定属性，可以传入Array类型的参数，

```
var s = JSON.stringify(xiaoming, ["name", "skills"], "  ");
console.log(s);
```

第二个参数还可以传入函数，

```
function convert(key, value) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value;
}

var s = JSON.stringify(xiaoming, convert, "  ");
console.log(s)
```

