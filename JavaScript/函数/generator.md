# generator

generator 是ES6标准引入的新的数据类型。一个 generator 看上去像一个函数，但是可以返回多次。

在介绍 generator 的定义之前，先复习一下函数的概念。

```
function foo(x) {
    return x + x;
}

var r = foo(1);
```

函数在执行过程中，如果没有遇到 return 语句（函数末尾如果没有 return，就是隐含的 return undefined;），控制权无法交回被调用的代码。

generator 跟函数很像，定义如下：

```
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
```

generator 和函数主要存在以下两个不同点：

- generator 由 function* 定义；
- generator 除了 return 语句，还可以用 yield 返回多次；

那么 generator 可以实现返回多次的特点，可以用来做什么呢？

看下面一个例子，假设我们要写一个能产生斐波那契数列的函数，用函数的写法可以这么写：

```
function fib(max) {
    var
        t,
        a = 0,
        b = 1,
        arr = [0, 1]
        while(arr.length < max) {
            [a, b] = [b, a + b];
            arr.push(b);
        }
        return arr;
}

fib(5);
fib(10);
```

因为函数只能返回一次，所以必须将每一次的结果存储到 Array 中去。但是，如果利用 generator，就可以一次返回一个数，不断返回多次。

```
function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while(n < max) {
        yield a;
        [a, b] = [b, a + b];
        n ++;
    } 
    return;
}

var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}
```

next() 方法会执行 generator 的代码，每次遇到 yield x 就返回一个对象 {value: x, done: true/false}，然后“暂停”。其中，value 就是 yield 的返回值，done 表示 generator 是否已经执行结束。如果 done 为 true，那么 value 就是 return 的返回值。

除了 next() 这种调用方法，还有一种就是直接用 for … of 循环迭代 generator 对象，此时不需要自己判断 done 的取值。

```
for (var x of fib(10)) {
    console.log(x);
}
```



 那么和普通函数相比，generator 最重要的特点在哪里呢？

因为 generator 可以在执行过程中多次返回，所以它看上去像是一个可以**记住执行状态**的函数，利用这一点，编写一个 generator 就可以实现需要用面向对象才能实现的功能。比如，用一个对象来保存状态，需要这么写，

```
var fib = {
    a: 0,
    b: 1,
    n: 0,
    max: 5,
    next: function () {
        var
            r = this.a,
            t = this.a + this.b;
        this.a = this.b;
        this.b = t;
        if (this.n < this.max) {
            this.n ++;
            return r;
        } else {
            return undefined;
        }
    }
};
```

但是有了 generator 就无需写这么繁琐的代码了。



generator 还有一个巨大的好处，就是把异步代码回调变成“同步”代码。这个好处要等到后面学了AJAX以后才能体会到。