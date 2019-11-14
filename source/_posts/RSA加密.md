---
title: RSA加密
date: 2017-10-17 18:18:55
tags: java RSA
---
2017年五月13日早些时候群里就流传了一些学校机房里的机器中了一种蠕虫病毒的图，那时候都是怀着一种调侃的心情看这些图，因为机房没法使用我们学生们就不用上一些实习了233。

![](https://blog-malu.oss-cn-beijing.aliyuncs.com/%E7%95%8C%E9%9D%A2.jpg?x-oss-process=style/blog)

比这的更早些时候也有一些勒索程序，windows平台下的，也有[Android](https://www.android.com/)平台下的。不过他们更像是一些脚本小子是使用出售的模版改些东西就传播的东西，因为当时确实也因为各种勒索软件爆发论坛上有一些抱怨，互联网更深的地方还有人出售易语言勒索程序的模版。但是五月13日后画风就越来越不一样了。先是群里这种机房被感染的图片越来越多，它不是单独的一个勒索软件，他还是一个蠕虫病毒，他会自我复制传播感染其他机器，更要命的是他还利用了一个windows平台下的0DAY（[永恒之蓝](https://zh.wikipedia.org/wiki/%E6%B0%B8%E6%81%92%E4%B9%8B%E8%93%9D)）漏洞。。。

五月12日晚微博上[山东大学](https://zh.wikipedia.org/wiki/%E5%B1%B1%E4%B8%9C%E5%A4%A7%E5%AD%A6)、[南昌大学](https://zh.wikipedia.org/wiki/%E5%8D%97%E6%98%8C%E5%A4%A7%E5%AD%A6)、[广西师范大学](https://zh.wikipedia.org/wiki/%E5%B9%BF%E8%A5%BF%E5%B8%88%E8%8C%83%E5%A4%A7%E5%AD%A6)、[桂林电子科技大学](https://zh.wikipedia.org/wiki/%E6%A1%82%E6%9E%97%E9%9B%BB%E5%AD%90%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%B8)、[大连海事大学](https://zh.wikipedia.org/wiki/%E5%A4%A7%E8%BF%9E%E6%B5%B7%E4%BA%8B%E5%A4%A7%E5%AD%A6)、[东北财经大学](https://zh.wikipedia.org/wiki/%E4%B8%9C%E5%8C%97%E8%B4%A2%E7%BB%8F%E5%A4%A7%E5%AD%A6)等十几家高校发布通知，提醒师生注意防范。这个时候就能看出WannaCry这个蠕虫病毒开始搞大新闻了。除了教育网、校园网以外，[新浪微博](https://zh.wikipedia.org/wiki/%E6%96%B0%E6%B5%AA%E5%BE%AE%E5%8D%9A)上不少用户反馈，北京、上海、江苏、天津等多地的出入境、派出所等公安网和政企专网也遭遇了病毒袭击，许多公安机关和政府部门由于勒索软件的影响被迫停止工作。[中国国家互联网应急中心](https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E5%9B%BD%E5%AE%B6%E4%BA%92%E8%81%94%E7%BD%91%E5%BA%94%E6%80%A5%E4%B8%AD%E5%BF%83)发布关于防范WannaCry的情况通报，称全球约101.1万个IP地址遭受“永恒之蓝”SMB漏洞攻击工具的攻击尝试，发起攻击尝试的IP地址数量9300余个。重要的是，英国的医院还被感染了。这下感觉彻底没救了，作者公布解密方案都没法挽回了。

WannaCry会加密硬盘上的所有文件，它还会提示你，如果你想解密，需要给一个比特币地址支付比特币。那么它怎么确认是谁交了比特币呢？它得确保每个被感染的机器都有唯一的标识，不能用一个统一的比特币钱包地址，因为这样没法确认是谁交了比特币。WannaCry确实会通过tor网络给每一个感染机器分配一个比特币地址，这样作者只需要给检测单独比特币钱包是否有足够的比特币就可以给那些机器解密密钥。但是在中国的GFW是屏蔽了tor网络的。所以在中国地区感染的机器只会显示三个固定的比特币地址

115p7UMMngoj1pMvkpHijcRdfJNXj6LrLn

12t9YDPgwueZ9NyMgw519p7AA8isjr6SMw

13AM4VW2dhxYgXeQepoHkHSQuy6NgaEb94

所以中国地区被感染的机器想要解密是没门的，但是确实有不少人给上面那三个比特币地址支付比特币。不知道那些受害者在支付后石沉大海会是什么感觉。

这时候我想到了那些交了钱的人拿到解密密钥后把密钥公布那样岂不是其他人就不用交钱了么？

那如果交了比特币，作者会以什么样的方式给受害者解密呢我想。

感染加密的时候使用对称加密，加密完上传加密密钥和机器号到作者服务器

那么这样得确保被感染的机器能联网，而且windows默认是不给联网权限的，pass

感染的时候使用随机的对称加密密钥，这样不会解密一个其他人都知道了密钥。

但是这样你怎么知道随机生成的密钥是啥呢？发送给作者？不可能，默认是没联网权限的。pass

使用不对称加密的其中一个密钥 加密 对称加密的 密钥！

这样子就变成了加密的时候随机生成一个对称加密的密钥，加密本地的数据，加密完成后使用硬编码的不对称加密的其中一个密钥（这样子就成为公钥）加密对称加密的密钥。

解密的时候就把被加密过后的密钥发送给作者，作者用自己的私钥解密后发给你。

这里用到了不对称加密的一个特性，**用其中一个密钥加密的消息只能被另一个密钥解密**。

实际上WannaCry的加密过程会复杂点，WannaCry会本地生成一对RSA的一对密钥（我一直不明白这是为什么）。WannaCry 会给每个文件都单独生成一个AES的密钥加密后用本地生成的公钥加密，私钥由硬编码在程序里的另一对RSA密钥中的公钥加密（作者在他本地生成的RSA密钥对）实际上WannaCry是硬编码了主公钥，还有一对RSA密钥对，用作演示解密使用。。。（作者真贴心啊）
![](https://blog-malu.oss-cn-beijing.aliyuncs.com/%E6%B5%81%E7%A8%8B.jpg?x-oss-process=style/blog)

暑假闲着没事，就尝试用java实现RSA密钥对的生成。

按照wiki说明，得先选择两个大的质数p和q，生成N = pq。

这里使用了java的BigInteger对象，BigInteger有probablePrime的方法可以直接生成指定的素数（java就是好，库各种齐全）

```java
	  BigInteger q = BigInteger.probablePrime(100, new Random()); // 取 2^100-1 范围内的随机素数
	  BigInteger p = BigInteger.probablePrime(100, new Random());
	  BigInteger N = q.multiply(p);  // q * p 
```
接着求一个r，r = (p-1)(q-1)

```java
BigInteger r = q.subtract(BigInteger.ONE).multiply(p.subtract(BigInteger.ONE)); 
//(q - 1)*(p - 1)
```

选择一个小于r的整数e，使e与r互质。

这里理论上e是任何小于r且与r互质的整数，但是通常基于性能考虑会选择65537.

> openssl的低级版本一般会将e=3作为默认的RSA公钥指数。选取小公钥指数主要是为了提高加密或签名验证的性能，比如选e=3只需要2次模乘(ModMul)，而随机选择的e(假设n是1024-bit)则大概需要1000次模乘。NIST SP800-78 Rev 1 (2007) 曾强调“不允许使用比65537更低的公钥指数e”，但PKCS#1却从未有过类似的建议。e=65537=(2^16+1)，其签名/加密运算只需要17次模乘，性能也算不错。但我认为选这个值的目的只是一个介于小指数攻击和运算效率之间的一个折中考虑，即以防万一将来有一天"e=3"被攻破而侥幸"e=65537"可能还是安全的。
>
> （http://blog.csdn.net/hherima/article/details/52461759）

求得e关于r的模反元素，命名为d。

使用扩展欧几里德算法可以求的d

java里定义了静态变量用于exgcd使用，这里写得很不好看。。。或许还有更优雅的写法。

```java
static BigInteger x,y,o = BigInteger.valueOf(0),o1 = BigInteger.valueOf(1);	
public static BigInteger exgcd(BigInteger a,BigInteger b){  
	if(b.compareTo(o)==0){
        x = o1; y = o; return a;
    }else{
    	BigInteger d = exgcd(b,a.mod(b));
        BigInteger temp = x;
        x = y;
        y = temp.subtract(a.divide(b).multiply(y))  ;
        return d;
    }
    
}
```
这样，我们就完成了生成一对RSA密钥对的所有步骤，（N，e）是公钥，(N，d)是你的私钥。

>如果你使用随机生成的e，那么任意一个密钥都可以是公钥或私钥，但是工业界e是默认的65537，故(N,e)只能是公钥。

```java
BigInteger n = new BigInteger("65535");
```

使用公钥加密消息是，使用双方约定好的方式将消息转换成一段段小于N的且与N互质的整数n,则加密后的消息为![{\displaystyle c\equiv n^{e}{\pmod {N}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/5c7221f755ee1dc5c37a0d3843763d300a47fd55)。

这里因为e是65537，本身就是一个素数。所以消息只需要切片成小于65537且不为1就可以了。

```java
	  BigInteger n = new BigInteger("65535");
	  System.out.println("n= " + n);
	  BigInteger c = n.modPow(e, N);
```
解密消息可以用私钥d来解码，将接收的c通过以下公式转换为n：![ c^d \equiv n\ (\mathrm{mod}\ N) ](https://wikimedia.org/api/rest_v1/media/math/render/svg/39e4d41353bed8f138cc9f567741051c544b7720)

```java
	  System.out.println("c= " + c);
	  BigInteger nc = c.modPow(d, N);
	  System.out.println("nc= " + nc);
```


解码的原理是


已知

![{\displaystyle ed\equiv 1{\pmod {r}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/615bfc80513abf2a32d6c105b6b150c05773029b)，即 ![{\displaystyle ed=1+h\varphi (N)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/64e2c5e70f23fe9595cf64923d3d190f7470fc08)。 由[欧拉定理](https://zh.wikipedia.org/wiki/%E6%AC%A7%E6%8B%89%E5%AE%9A%E7%90%86_(%E6%95%B0%E8%AE%BA))得：![{\displaystyle n^{ed}=n^{1+h\varphi (N)}=n\left(n^{\varphi (N)}\right)^{h}\equiv n(1)^{h}{\pmod {N}}\equiv n{\pmod {N}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/79569d77cd17c2c265be3b2980878a3a59aa1a7e)

RSA同样可以用来签名消息，只要拥有私钥的一方在消息后添加消息的散列值的加密信息，拥有公钥的一方接收到消息后可以用公钥解密散列值并于消息对比，如果消息的散列值与解密后的一致，则这个消息在传播路径上没有被篡改过。

至此，RSA密钥的生成实验已经做完了，RSA的加密和签名的安全性是基于目前没有合适的算法，其复杂度增长超过目前计算机算力的增长。所以RSA的加密只要随着计算机升级增加密钥长度就可以了。可是当今计算机是怎么分发公钥的呢？说着说着感觉我知道我的下一篇应该写什么了。



源代码：


```java
package math;
import java.math.*;
import java.util.Random;
public class Encode {
static BigInteger x,y,o = BigInteger.valueOf(0),o1 = BigInteger.valueOf(1);
public static void main(String[] args) {
	// TODO 自动生成的方法存根
	
	  BigInteger q = BigInteger.probablePrime(100, new Random()); // 取 2^100-1 范围内的随机素数
	  BigInteger p = BigInteger.probablePrime(100, new Random());
	  BigInteger N = q.multiply(p);  // q * p 
	  BigInteger r = q.subtract(BigInteger.ONE).multiply(p.subtract(BigInteger.ONE)); //(q - 1)*(p - 1)
	  System.out.println("q= " + q);  
	  System.out.println("p= " + p);  
	  System.out.println("N= " + N);  
	  System.out.println("r= " + r);  
	  BigInteger e = new BigInteger("65537" );//new BigInteger(10,new Random()); 
	  //while(r.gcd(e).equals(BigInteger.ONE)){
		  //System.out.println(e);  
		  //e =new BigInteger(10,new Random());
	 // }
	  System.out.println("e= " + e);
	  exgcd(e, r);
	  BigInteger d = x;//new BigInteger("2753" );
	  System.out.println("d= " + d);
	  //BigInteger n = BigInteger.probablePrime(11, new Random());
	  BigInteger n = new BigInteger("65535");
	  System.out.println("n= " + n);
	  BigInteger c = n.modPow(e, N);
	  System.out.println("c= " + c);
	  BigInteger nc = c.modPow(d, N);
	  System.out.println("nc= " + nc);

}

public static BigInteger exgcd(BigInteger a,BigInteger b){  
	if(b.compareTo(o)==0){
        x = o1; y = o; return a;
    }else{
    	BigInteger d = exgcd(b,a.mod(b));
        BigInteger temp = x;
        x = y;
        y = temp.subtract(a.divide(b).multiply(y))  ;
        return d;
    }
    
}
}
```




