function sum(arr) {
    return arr.reduce(function (x,y) {
        return x + y;
    });
}

sum([1,2,3,4,5])

function lazy_sum(arr) {
    var sum = function() {
        return arr.reduce(function (x,y) {
            return x + y;
        });
    }
    return sum;
}

var f = lazy_sum([1,2,3,4,5]);
f();

var f1 = lazy_sum([1,2,3,4,5]);
var f2 = lazy_sum([1,2,3,4,5]);
f1 === f2;


function count() {
    var arr = [];
    for (var i = 1; i <= 3; i++) {
        arr.push(function () {
            return i*i;
        })
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

function count() {
    var arr = [];
    for (var i = 1; i <= 3; i++) {
        arr.push((function (n) {
            return function() {
                return n*n;
            }
        })(i));
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

'use strict';
function create_counter(initial) {
    var x = initial || 0;
    return {
        inc: function() {
            x += 1;
            return x;
        }
    }
}

var c1 = create_counter();
c1.inc();
c1.inc();
c1.inc();

var c2 = create_counter(10);
c2.inc();
c2.inc();
c2.inc();

'use strict';
function make_pow(n) {
    return function(x) {
        return Math.pow(x, n);
    }
}

var pow2 = make_pow(2);
var pow3 = make_pow(3);

console.log(pow2(5));
console.log(pow3(6));



var zero = function(f) {
    return function(x) {
        return x;
    }
}

x => {
    if (x > 0) {
        return x * x;
    } else {
        return - x * x;
    }
}

(x, y) => x * x + y * y; // 双参数

() => 3.14; // 无参数

(x, y, ...rest) => {
    var i, sum = x + y;
    for (i = 0; i < rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}  // 可变参数

var obj = {
    birth: 1990,
    getAge: function() {
        var b = this.birth;
        var fn = function () {
            return new Date().getFullYear() - this.birth;
        };
        return fn();
    }
}

obj.getAge(); // NaN


var obj = {
    birth: 1990,
    getAge: function() {
        var b = this.birth;
        var fn = () => new Date().getFullYear() - this.birth;
        return fn();
    }
}

obj.getAge();


var obj = {
    birth : 1990,
    getAge : function(year) {
        var b = this.birth;
        var fn = (y) => y - this.birth;
        return fn.call({birth:2000}, year);
    }
}

obj.getAge(2015);


'use strict'
var arr = [10, 20, 1, 2];
arr.sort((x, y) => {
    if (x > y) {
        return 1;
    }
    else if (x < y) {
        return -1;
    }
    else {
        return 0;
    }
});
console.log(arr); // [1, 2, 10, 20]

var arr = [10, 20, 1, 2];
var fn = function(x, y) {
    if (x > y) {
        return 1;
    }
    else if (x < y) {
        return -1;
    }
    else {
        return 0;
    }
}

function foo(x) {
    return x + x;
}

var r = foo(1);

function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}

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
f.next();
f.next();
f.next();
f.next();
f.next();
f.next();

for (var x of fib(10)) {
    console.log(x);
}

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
fib.next();

'use strict';
function* next_id() {
    var 
        current_id = 0,
        n = 0;
    if (n < Number.POSITIVE_INFINITY) {
        yield current_id;
        current_id += 1;
        n++;
    } else {
        return;
    }
}
var test = next_id();
test.next();
test.next();

function* next_id() {
    var current_id = 0;
    while(true) {
        yield current_id;
        current_id++;
    }  
}
var test = next_id();

var now = new Date();
now;

var d = new Date(2019, 7, 23, 20, 15, 30, 123);
d;

var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');

var re = /^\d{3}\-\d{3,8}$/;
re.test("010-12345");
re.test("010-1234x");
re.test("010 12345");


var re3 = /\s+/;
var re4 = new RegExp('\s+');
'a b   c'.split(" ");
'a b   c'.split(re3);
'a b   c'.split(re4);
'a b   c'.split(/\s+/);
'a,b, c  d'.split(/[\s\,]+/);
'a,b;; c  d'.split(/[\,\;\s]+/);

var re = /^(\d{3})-(\d{3,8})$/;
re.exec("010-12345"); // ["010-12345", "010", "12345", index: 0, input: "010-12345", groups: undefined]
re.exec("010 12345"); // null


var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
re.exec('19:05:30'); // ["19:05:30", "19", "05", "30", index: 0, input: "19:05:30", groups: undefined]


should_pass = ['someone@gmail.com', 'bill.gates@microsoft.com', 'tom@voyager.org', 'bob2015@163.com']

var re = /^[a-z.0-9]+@[a-z0-9]+\.([com]?[org]?)+$/;
re.test('someone@gmail.com');
re.test('bill.gates@microsoft.com');
re.test('tom@voyager.org');
re.test('bob2015@163.com');

should_fail = ['test#gmail.com', 'bill@microsoft', 'bill%gates@ms.com', '@voyager.org'];
re.test('test#gmail.com');
re.test('bill@microsoft');
re.test('bill%gates@ms.com');
re.test('@voyager.org');

var str = "<Tom Paris> tom@voyager.org";
var re = /^<([a-zA-Z]+\s+[a-zA-Z]+)>\s+([a-z.0-9]+@[a-z0-9]+\.[org]+|[com]+)$/;

re.exec(str)

var re = /\.[com]|[org]/
re.test("test.com")

'use strict';

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

var s = JSON.stringify(xiaoming, ["name", "skills"], "  ");

function convert(key, value) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value;
}

var s = JSON.stringify(xiaoming, convert, "  ");
console.log(s)