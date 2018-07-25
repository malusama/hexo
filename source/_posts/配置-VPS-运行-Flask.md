---
title: '配置 VPS 运行 Flask '
date: 2018-04-23 23:22:54
tags: Falsk VPS
---

​	话说之前因为自己很喜欢 [ACGN_STOCK](https://acgn-stock.com/) 这个网站，但是因为不喜欢上面 ”金管会“ 的一些规定，加上 自己非常喜欢类似 EVE 里面那个自由市场，很喜欢这种万物都可以自由交易的游戏。所以打算自己实现一个类似的网站。

​	因为自己之前的一个项目是 Falsk 框架的原因，所以打算用 Flask 框架和 Postgresql 数据库来实现这个网站。在看着教程一步一步架起一个后端后，就直接按照想法添加数据库中的表和字段了。由于这是自己第一个从头撸到尾的工程，所以踩了很多坑，类似数据库字段因为自己之前设计的不周到没考虑到，所以很多时候是写着写着数据库就又多了一个字段。但是摸爬滚打也实现了基本的样子，用户的注册登录，在市场浏览股票，股票页面的买卖交易。其中后端逻辑肯定有很多不完善的地方。但似乎感觉自己撸后端还是非常有成就感的。

​	在项目初步跑起来后就面临另一个问题，网站得跑在远程的服务器上，毕竟自己在本地写代码用的是 Falsk 自己的 server 。之前还完全没有尝试过在 VPS 上搭建跑起来过，于是在这里记录一下架设过程。

​	在 VPS 上通过 Gihub clone 整个项目，就得到了后端的所有代码，之后的安装 Python 所需要的库，Python 的插件可以通过

```
pip install -r  requirements.txt 
```

安装 requirements.txt 文件中项目说需要的所有库，非常方便。

不过我们这个项目需要 Python3 ，Debian 上会自带 Python2 和 Python3 两个版本的 Python，但是默认的 pip 是 Python2 的，于是打算安装 pyenv 来实现多版本 Python 的管理。

通过下面这个脚本实现 pyenv 的安装。

```bash
curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
```

安装完 pyenv 后，shell 并不能识别 pyenv，因为系统的根目录里没有包含 pyenv 的目录。我们需要将pyenv 的目录添加进当前所使用的 bash 配置里。这里以 bash 为例子，zsh的配置配置文件为～/.zshrc

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc‘’‘
```

之后用 source 命令使用新配置重启 base

```bash
source ~/.bashrc
```

之后使用 pyenv 安装 3.5.4 的 Python，并将其设置为全局 Python 版本。

- `pyenv install version` 安装，version 为对应的 Python 版本号，如 2.7.9；
- `pyenv virtualenv 3.5.2 webapp-3.5.2` 以 3.5.2 版本创建虚拟环境；
- `pyenv uninstall version` 删除 version 版本的 Python；
- `pyenv commands` 列出所有命令；
- `pyenv versions` 查看 pyenv 当前可检测到的所有版本，处于激活状态的版本前以 * 标示；
- `pyenv local 2.7.9` 设置局部版本
- `pyenv which python` 查看当前 python 命令的路径；
- `pyenv which pip` 查看当前 pip 命令的路径；

 执行 pyenv install 3.5.4 后，安装失败 。提示没有 openssl， zlib。执行

```bash
apt install openssl zlib*
```

安装完毕～ 撒花❀❀❀❀

升级 pip 不然有些库安装不了

```
pip install --upgrade pip
```

安装所需要的所有库

```
pip install -r requirements.txt
```

在使用 gunicorn 部署 Falsk 应用前，得先安装 postgresql 和 redis。分别是关系式数据库和 nosql 数据库。用来储存网站所需要的信息和做爬虫缓存。

postgresql 的安装就不多言了，安装完成后需要创建一个用户和数据库。这里可以用写好的 sql 文件直接执行创建数据库

`psql stock -c "\i sql/schema.sql"`

确定创建的用户拥有数据库的所有权限。

安装 redis-server。之后就可以用 gunicorn 部署 Flask 应用了。

```
gunicorn -b 0.0.0.0:80 run:app
```

 run.py

```python
#!flask/bin/python
from app import app


if __name__ == '__main__':
    app.run(debug=True)

```



运行后很多字符错误。。。才发现每个文件开头的那句声明使用utf8的重要性。。。

```
# -*- coding: utf-8 -*
```

至此一个运行Python 后端的服务器就好了。访问 http://106.15.205.43/ 就可以看到。