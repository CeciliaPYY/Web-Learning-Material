# Promise

在JavaScript的世界中，所有代码都是单线程执行的。

由于这个“缺陷”，导致JavaScript的所有网络操作，浏览器事件，都必须是异步执行。异步执行可以用回调函数实现。

古人云：“君子一诺千金”，这种“承诺将来会执行”的对象在JavaScript中称为Promise对象。

先看一个简单的 Promise 的例子——生成一个0-2之间的随机数，如果小于1，则等待一段时间后返回成功，否则返回失败：

```
new Promise(function test(resolve, reject) {
    var timeOut= Math.random() * 2;
    setTimeout(function () {
        if (timeOut < 1) {
            log('call resolve()...');
            resolve('200 OK');
        }
        else {
            log('call reject()...');
            reject('timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
}).then(function (r) {
    log('Done: ' + r);
}).catch(function (reason) {
    log('Failed: ' + reason);
})
```

可见 Promise 的最大好处在异步执行的流程中把执行代码和结果处理代码清晰地分离了：

![promise](/Users/pengyuyan/Documents/Web-Learning-Material/JavaScript/面向对象编程/images/l1.png)

有了 Promise 之后还可以处理这种情况。比如，有若干个异步任务，需要先做任务1，如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。

要串行执行这样的异步任务，不用 Promise 写一层一层的千淘代码。有了 Promise，只需要简单地写：

`job1.then(job2).then(job3).catch(handlerError);`

其中，`job1`、`job2`和`job3`都是Promise对象。

```
function multiply(input) {
    return new Promise(function(resolve, reject) {
        log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 500, input * input);
    })
}

function add(input) {
    return new Promise(function (resolve, reject) {
        log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 500, input + input);
    })
}

new Promise(function (resolve, reject) {
    log('start new Promise...');
    resolve(123);
}).then(multiply).then(add).then(multiply).then(add).then(function (result) {
    log('Got value: ' + result);
})
```

`setTimeout`可以看成一个模拟网络等异步执行的函数。现在我们可以用 Promise 的方法去修改 AJAX 中的异步执行函数了，

```
function ajax(method, url, data) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}

var log = document.getElementById('test-promise-ajax-result');
var p = ajax('GET', '/api/categories');
p.then(function (text) {
    log.innerText(text);
}).catch(function (status) {
    log.innerText('Error: '+ status);
})
```

除了串行执行若干异步任务外，Promise 还可以并行执行异步任务。

举个例子，试想一个页面聊天系统，需要从两个不同的 URL 分别获得用户的个人信息和好友列表，这两个任务是可以并行执行的，用 `Promise.all()`实现如下：

```
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); // 获得一个Array: ['P1', 'P2']
});
```

有些时候，多个异步任务是为了容错。比如，同时向两个URL读取用户的个人信息，只需要获得先返回的结果即可。这种情况下，用`Promise.race()`实现：

```
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
})

var p2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 600, 'P2')
})

Promise.race([p1, p2]).then(function (results) {
    console.log(results); // 'P1'
})
```

由于 `p1`执行更快，Promise 的 `then`将获得结果`'P1'`。`p2`仍在继续执行，但执行结果将被丢弃。

如果我们组合使用Promise，就可以把很多异步任务以并行和串行的方式组合起来执行。