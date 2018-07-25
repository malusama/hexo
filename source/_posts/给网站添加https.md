---
title: 给网站添加https
date: 2018-05-02 17:25:23
tags: "https"
---

​	在服务器上跑起 Flask 后访问登录或注册页面 Chrome 总是会在地址栏提示当前页面不安全，的确http 是明文传输，而且会有中间人攻击的风险。总之不管怎么样地址栏有个绿色的小锁总感觉会爽很多啦。

​	在谷歌搜索了一些文章，发现还有用 openssl 自签署证书的。但是这相当于你自己证明你是你自己，使用自签署的证书只是保证传输过程加密了，但是你加密的信息发送给了谁你并不知道。这里得有一个第三方出现，一个传输双方都信任的对象来作担保。于是CA机构就出现了。

​	不过好像 12306 就是在首页挂上自己的证书要求你安装。。。感觉这简直违背了 https 的意义。好像 12306 这么做是想推广它自己家的CA服务。。。真是生财有道啊。 

​	看了一下现在腾讯云和阿里云都有个人CA证书的申请服务了，当然用的是[Let's encrypt](https://easy.zhetao.com/ztcam.oms?omsv=wiki&_verip_csrf_token_name=null)之类的个人免费证书。申请之后会要求你验证你所申请的域名控制权，会要求你添加一条TXT记录或者使域名指向一个文件之类的。在CA机构扫描完成后阿里云或者腾讯云会给你发邮件。在控制台你可以下载你的证书。认证过程大概十几分钟就可以完成。

​	下载证书后 nginx 配置里添加

```nginx
	listen 443;
	ssl on;
	ssl_certificate /etc/nginx/ssl/1_www.malu.moe_bundle.crt;
    ssl_certificate_key /etc/nginx/ssl/2_www.malu.moe.key;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # 使用的协议
```

重启你的 nginx 服务就可以看到 https 生效了。要注意证书所签署的域名必须和当前域名匹配。

比如 malu.moe 这单个域名的证书只能在 malu.moe 域名下使用，如果在 stock.malu.moe 下就会提示证书不匹配。 Chrome 大概会提示你有风险，还会拦截下来。 

​	个人只能申请单个域名的证书，如果申请泛域名证书会很贵。大概上千块一年的样子。申请更高级别的认真就越麻烦。最高级别还会有人到公司审核的样子。不过一个域名能申请20个单域名证书的样子，大概也够用了。

​	现在访问 [Stock.malu.moe](https://stock.malu.moe) 看看吧

