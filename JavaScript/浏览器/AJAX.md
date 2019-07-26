# AJAX

AJAX - Asynchronous JavaScript and XML ，即用 JS 执行异步网络请求。

在现代浏览器上写AJAX主要依靠`XMLHttpRequest`对象：

```
'use strict';
function success(text) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = text;
}

function fail(code) {
    var textarea = document.getElementById('test-response-text');
    textarea = 'Error code: ' + code;
}

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果
        if (request.status === 200) {
            // 成功
            return success(request.responseText);
        } else {
            return fail(request.status);
        } 
    } else {
        // Http 请求还在继续
    }
}

request.open('GET', '/api/categories');
request.send();

alert('请求已发送，请等待响应...');
```



## 安全限制

默认情况下，JS 在发送 AJAX 请求时，URL的域名必须和当前页面完全一致。

这里的“完全一致”指的是以下几点都需要一致，

- 域名要相同；
- 协议要相同；
- 端口号要相同；

有的浏览器口子松一点，允许端口不同，大多数浏览器都会严格遵守这个限制。



那么如何用 JS 请求外域（其他网站）的URL呢？大概有以下几种方法，

- 用Flash插件发送 HTTP 请求，这种方法可以绕过浏览器的安全限制，但必须安装Flash。
- 在同源域名下架设一个代理服务器，JavaScript负责把请求发送到代理服务器：`/proxy?url=http://www.sina.com.cn`。代理服务器把结果返回，这样就遵守了浏览器的同源策略。这种方法的麻烦之处在于需要服务端做额外开发。
- 第三种方法叫JSONP，它有个限制，只能用GET请求，并且要求返回JavaScript。这种方式跨域实际上是利用了浏览器允许跨域引用JavaScript资源。

```
<html>
<head>
    <script src="http://example.com/abc.js"></script>
    ...
</head>
<body>
...
</body>
</html>
```

JSONP通常以函数调用的形式返回，例如，返回JS内容如下：

`foo('data');`

因此如果在页面中先准备好 `foo()` 函数，然后给页面动态加一个`<script>`节点，相当于动态读取外域的JavaScript资源，最后就等着接收回调了。举个例子，

以163的股票查询URL为例，对于URL：http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice，你将得到如下返回：

```
refreshPrice({"0000001":{"code": "0000001", ... });
```

因此我们首先要准备好回调函数`refreshPrice()`，

```
function refreshPrice(data) {
    var p = document.getElementById('test-jsonp');
    p.innerHTML = '当前价格：' +
    data['0000001'].name +': ' + 
    data['0000001'].price + '；' +
    data['1399001'].name + ': ' +
    data['1399001'].price;
}
```

最后用`getPrice()`函数触发，

```
function getPrice() {
    var
        js = document.createElement('script'); // 给页面动态加一个<script>节点
        head = document.getElementsByTagName('head')[0];
        js.src = 'http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice';
        head.appendChild(js);
}
```



## CORS

如果你的浏览器支持HTML5，那么就可以一劳永逸地使用新的跨域策略了——CORS。

CORS全称为 Cross-Origin Resource Sharing，是HTML5规范定义的如何跨域访问资源。

Origin表示本域，也就是浏览器当前页面的域。当 JS 向外域（如sina.com）发送请求后，浏览器收到响应后，首先检查`Access-Control-Allow-Origin`是否包含本域，如果是，则此次跨域请求成功，否则，则请求失败，JS将无法获取到响应的任何数据。

用一张图来表示就是，

![cors](/Users/pengyuyan/Desktop/cors.png)

我们可以看到外域返回的响应的`Access-Control-Allow-Origin`中包含本域，因此本次请求就可以成功。

可见跨域是否成功，取决于对方服务器是否愿意给你设置一个正确的`Access-Control-Allow-Origin`，决定权始终在对方手中。



在引用外域资源时，除了 JavaScript 和 CSS，都要验证 CORS。比如，当你引用了某个第三方CDN上的字体文件时：

```
/* CSS */
@font-face {
  font-family: 'FontAwesome';
  src: url('http://cdn.com/fonts/fontawesome.ttf') format('truetype');
}
```

如果该CDN服务商未正确设置`Access-Control-Allow-Origin`，那么浏览器无法加载字体资源。

对于 PUT、DELETE以及其他类型如 `application/json`的 POST 请求，在发送 AJAX 请求之前，浏览器会先发送一个 `OPTIONS` 请求（称为 preflighted 请求）到这个 URL 上，询问目标服务器是否接受：

```
OPTIONS /path/to/resource HTTP/1.1
Host: bar.com
Origin: http://my.com
Access-Control-Request-Method: POST
```

服务器必须响应并明确指出允许的Method：

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://my.com
Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS
Access-Control-Max-Age: 86400
```

浏览器确认服务器响应的`Access-Control-Allow-Methods`中的确包含将要发送的 AJAX 请求的 Method，才会继续发送 AJAX，否则抛出一个错误。

由于以`POST`、`PUT`方式传送JSON格式的数据在REST中很常见，所以要跨域正确处理`POST`和`PUT`请求，服务器端必须正确响应`OPTIONS`请求。