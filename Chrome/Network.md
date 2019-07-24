# Network

## 摘要

Network 面板使用的两大主要情景，

- 确保资源的上传和下载的完整性；
- 检查单个资源的属性，比如它的 HTTP头、内容、大小等等；



## Log Network Activity

- Network日志的每一行代表了一种资源，默认情况下行是按照时间顺序排列的；
- Network日志的每一列代表资源的一个属性，默认属性有以下几种
  - status: http response code;
  - type: resource type;
  - initiator: what caused a resource to be requested;
  - time: how long the request took;
  - waterfall: a graphical representation of the different stages of the request
- 显示更多其他属性，比如 Domain；



## Network Issues Guide

### Queued or stalled requests

#### 症状

- a series of requests are queued or stalled. 
- Once one of the first six requests finishes, one of the requests in the queue starts.



#### 原因

- Too many requests are being made on a single domain.
- On HTTP/1.0 or HTTP/1.1 connections, Chrome allows a maximum of six simultaneous TCP connections per host.



#### 解决方法

- Implement domain sharding if you must use HTTP/1.0 or HTTP/1.1.
- Use HTTP/2. Don't use domain sharding with HTTP/2.
- Remove or defer unnecessary requests so that critical requests can download earlier.



### Slow Time To First Byte (TTFB)

#### 症状

- A request spends a long time waiting to receive the first byte from the server.



#### 原因

- The connection between the client and server is slow.
- The server is slow to respond. Host the server locally to determine if it's the connection or server that is slow. If you still get a slow TTFB when service locally, then the server is slow.



#### 解决方法

- 考虑在CDN上存储内容或者更换服务器
- 优化数据库搜索，实现缓存或者修改服务器配置



### Slow content download

#### 症状

- A request takes a long time to download.



#### 原因

- The connection between the client and server is slow.
- A lot of content is being downloaded.



#### 解决方法

- 将内容存储在CDN上或者更换服务器
- 优化请求参数

