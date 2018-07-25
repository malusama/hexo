---
title: 给后端添加redis缓存
date: 2018-04-29 00:01:47
tags: 后端 redis
---

​	在 VPS 上架设好 Flask 后，我测试并发是经常发现 ORM 框架会发生错误，查询之后是 连接时设置的 pool_size 太小， 使用 SQLCHEMY 时默认的 pool_size = 5， 我改为100后就可以了。

​	但是如果大并发的时候一些热点数据应该还是会频繁的查询数据库，但是这些数据是不会经常更新的。所以我就想着这么用 redis 缓存那些经常被查询但是不会更新的数据， 比如公告， STOCK 的基本信息.

​	 我试了测试没有使用redis进行缓存时候打开首页查询公告时候的web服务器性能，使用 webbench 进行 500 线程 60 秒的测试。

```
Benchmarking: GET http://127.0.0.1:5000/
500 clients, running 60 sec.

Speed=1924 pages/min, 54160 bytes/sec.
Requests: 1924 susceed, 0 failed.

```

在添加 Reids 缓存后再以同样的参数进行测试

```
Benchmarking: GET http://127.0.0.1:5000/
500 clients, running 60 sec.

Speed=16735 pages/min, 468472 bytes/sec.
Requests: 16642 susceed, 93 failed.
```

发送速率直接上了一个数量级，舒服。

直接测试一下在 VPS 上跑的后端并发数，在没有添加 Redis 的后端测试的时候本地打开网页是不是回500

```
Benchmarking: GET http://106.15.205.43/index
500 clients, running 60 sec.

Speed=3990 pages/min, 106517 bytes/sec.
Requests: 3990 susceed, 0 failed.
```

添加后

```
Benchmarking: GET http://106.15.205.43/index
500 clients, running 60 sec.

Speed=3810 pages/min, 108984 bytes/sec.
Requests: 3810 susceed, 0 failed.
```

没想到却是一样的，为啥啊?