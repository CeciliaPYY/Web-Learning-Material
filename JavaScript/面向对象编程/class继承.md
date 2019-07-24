# class继承

基于原型继承的JavaScript对象模型比较简单，但是理解起来比传统的类-实例模型要困难，最大的缺点是继承的实现需要编写大量大麦，并且要保证原型链的实现是正确的。

这一节就开始学习如何使用class关键字去实现对象模型。

先回顾一下用函数实现 Student 的方法：

```
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function() {
    alert('Hello, ' + this.name + '!');
};
```

如果使用 class 关键字，上面的代码可以进行改写，

```
class Student {
    constructor(name) {
        this.name = name;
    }
    hello() {
        alert('Hello, ' + this.name + '!');
    }
}
```

比较上面两种方法就可以发现，class 的定义包含了构造函数 constructor 与定义在原型对象上的函数 hello()（无 function 关键字），这样就避免了`Student.prototype.hello = function () {...}`这样分散的代码。



## class继承

用`class`定义对象的另一个巨大的好处是继承更方便了。想一想我们从`Student`派生一个`PrimaryStudent`需要编写的代码量。现在，原型继承的中间对象，原型对象的构造函数等等都不需要考虑了，直接通过`extends`来实现：



