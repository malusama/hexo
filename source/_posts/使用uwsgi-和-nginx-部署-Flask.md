---
title: 使用uwsgi 和 nginx 部署 Flask
date: 2018-05-01 19:09:22
tags: uwsgi nginx Flask
---

​	之前使用了 gunicorn 来部署 Flask 应用,但是感觉 nginx 会不会更快一些, 于是就有了尝试使用 uwsgi 配合 nginx 来部署 Flask 的想法.

​	但是看了一些文章之后感觉速度应该是一样的, 后端都是 Python, 但是有人说 Nginx 更安全. 静态页面的支持也更好, 所以也配置玩一下顺便测试一下静态的并发量.

​	首先安装uWSGI, 使用pip来安装

```
pip install uwsgi
```

在 Flask 应用的目录下测试 uwsgi 是否工作 

```bash
uwsgi --socket 0.0.0.0:8000 --protocol=http -w run:app
```

这时候打开 127.0.0.1:8000 就可以看到 网站的首页了.

接着我们配置真正配合 nginx 使用的 uwsgi 配置.

在 Flask 应用目录下新建一个文件 config.ini 作为uwsgi 的配置文件

```
[uwsgi]
master = true
wsgi-file = run.py
callable = app
chmod-socker = 777
socket =  127.0.0.1:3031
processes = 4
threads = 2
buffer-size = 32768
```

这里 run.py 是 Flask 应用的主文件, socket 是接收 nginx 转发过来的接口.

使用这个配置文件启动 uwsgi

```
uwsgi config.ini
```

接着配置 nginx 的配置文件

nginx 默认的是 /etc/nginx/nginc.conf, 里面会载入 sites-enabled 里的所有文件.

所以我们在 sites-enabled 文件夹里新建个名为 stock.conf 的文件,填入以下字段

```nginx
server {
	listen 80;
	location / {
    	include uwsgi_params;
    	uwsgi_pass 127.0.0.1:3031;
	}
}
```

这里的意思是监听 80 端口的信息, 使用 uwsgi 传递给 127.0.0.1:3031 这个地址, 3031是随便取得, 取啥都可以, 没有被系统占用就行.

配置完成后可以先检查一下配置文件是否正确

```bash
sudo nginx -t
```

如果正确无误就可以启动 ngxin 了

```bash
sudo service nginx start
```

接着打开你的网址应该就可以看到网站的首页了.

接着我用 webbench -c 500 -t 60 测试本地的服务器并发数, 一回车 CPU 就吃满了

![](http://malu-picture.oss-cn-beijing.aliyuncs.com/18-5-1/23344536.jpg)

但是效果非常好, 比之前高了很多,

```
Benchmarking: GET http://127.0.0.1/
500 clients, running 60 sec.

Speed=135661 pages/min, 1288988 bytes/sec.
Requests: 94304 susceed, 41357 failed.
```

大约相比本地使用 Flask 自带的 http server 使用 Redis 缓存效果高五倍

接着测试打在阿里云 1G1C 服务器上的效果

```
Benchmarking: GET http://106.15.205.43/index
500 clients, running 60 sec.

Speed=4011 pages/min, 113179 bytes/sec.
Requests: 4011 susceed, 0 failed.
```

效果并没有好多少...不过看了113179 bytes/sec.大约也跑满了1m的带宽了...难道真的是我的服务器带宽限制了???

在付了两块钱临时升级3个小时到10M带宽后再进行测试一下.

先测速一下

```
Retrieving speedtest.net configuration...
Testing from CNISP-Union Technology (Beijing) Co. (106.15.205.43)...
Retrieving speedtest.net server list...
Selecting best server based on ping...
Hosted by China Telecom ZheJiang Branch (Hangzhou) [4.87 km]: 6.874 ms
Testing download speed................................................................................
Download: 324.60 Mbit/s
Testing upload speed................................................................................................
Upload: 9.36 Mbit/s
```

不错, 阿里云好像是带宽限制的是上传的, 下载能飙到 300 M. 测试前打开top查看cpu占用

```
top - 23:04:20 up 3 days,  4:32,  2 users,  load average: 1.81, 0.44, 0.14
Tasks:  96 total,   4 running,  92 sleeping,   0 stopped,   0 zombie
%Cpu(s): 77.7 us, 14.3 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  8.0 si,  0.0 st
KiB Mem :  2052568 total,  1291168 free,   161252 used,   600148 buff/cache
KiB Swap:        0 total,        0 free,        0 used.  1693260 avail Mem 
```

小鸡 CPU 跑到 70多...

```
Benchmarking: GET http://106.15.205.43/index
500 clients, running 60 sec.

Speed=43731 pages/min, 1123486 bytes/sec.
Requests: 42446 susceed, 1285 failed.
```

好了, 数据确实多了10倍...看来确实是带宽限制了. 小鸡 CPU 也不怎么受得了.

