---
title: “在github上搭建静态博客”
date: 2017-06-04 17:55:30
tags: 英才工程
---

​	GitHub 是一个通过 Git 进行版本控制的代码托管平台，它提供一个二级域名解析其域名下仓库的master分支下的html页面。那么我们就可以通过这个服务假设一个自己的博客。

​	但是自己写 html 无疑是重复照轮子，而且自己诚实的来讲，实在是懒。而且人家写的脚本生成出来的页面设计好看得多嘛。于是我这里使用 hexo 框架生成静态的博客页面，当然也有其他的框架比如 jekyll。这里使用hexo纯粹就是我个人选择问题了。

​	首先你得注册一个 github 的帐号，这里默认你已经有github账号了。然后申请一个名字为 user.github.io （user为你的用户名）的仓库，访问 user.github.io 会默认解析你master分支下的index.html页面。

{% asset_img 主页.png 仓库申请页面 %}

​	安装 hexo， hexo 是用node编写的，所以你得安装node环境。

下载Node.js安装文件：

- [Windows Installer 32-bit](https://nodejs.org/dist/v4.2.3/node-v4.2.3-x86.msi)
- [Windows Installer 64-bit](https://nodejs.org/dist/v4.2.3/node-v4.2.3-x64.msi)

下载Git安装文件：

- [Git-2.6.3-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.6.3.windows.1/Git-2.6.3-64-bit.exe)

​	必要的环境安装完成后就可以安装hexo了。在命令行下进入你需要安装的目录然后

​	在命令行中输入：

```
npm install hexo-cli -g
```

然后你将会看到:

{% asset_img npm-install-hexo-cli.png npm-install-hexo-cli %}

可能你会看到一个`WARN`，但是不用担心，这不会影响你的正常使用。 然后输入

```
npm install hexo --save

```

然后你会看到命令行窗口刷了一大堆白字，下面我们来看一看Hexo是不是已经安装好了。 在命令行中输入：

```
hexo -v

```

如果你看到了如图文字，则说明已经安装成功了。

{% asset_img hexo-v.png hexo-v %}

## 初始化Hexo

接着上面的操作，输入：

```
hexo init
```

然后输入：

```
npm install


```

之后npm将会自动安装你需要的组件，只需要等待npm操作即可。

## 首次体验Hexo

继续操作，同样是在命令行中，输入：

```
hexo g
```

然后输入：

```
hexo s

```

然后会提示：

```
INFO  Hexo is running at http://0.0.0.0:4000/. Press Ctrl+C to stop.

```

在浏览器中打开`http://localhost:4000/`，你将会看到：

{% asset_img hexo-first-time.png hexo-first-time %}

到目前为止，Hexo在本地的配置已经全都结束了。

## 修改全局配置文件

*此段落引用自Hexo官方文档*

您可以在 `_config.yml` 中修改大部份的配置。

### 网站

| 参数            | 描述                                       |
| ------------- | ---------------------------------------- |
| `title`       | 网站标题                                     |
| `subtitle`    | 网站副标题                                    |
| `description` | 网站描述                                     |
| `author`      | 您的名字                                     |
| `language`    | 网站使用的语言                                  |
| `timezone`    | 网站时区。Hexo 默认使用您电脑的时区。[时区列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。比如说：`America/New_York`, `Japan`, 和 `UTC` 。 |

### 网址

| 参数                  | 描述                                       | 默认值                         |
| ------------------- | ---------------------------------------- | --------------------------- |
| `url`               | 网址                                       |                             |
| `root`              | 网站根目录                                    |                             |
| `permalink`         | 文章的 [永久链接](https://xuanwo.org/2015/03/26/hexo-intor/permalinks.html) 格式 | `:year/:month/:day/:title/` |
| `permalink_default` | 永久链接中各部分的默认值                             |                             |

> 如果您的网站存放在子目录中，例如 `http://yoursite.com/blog`，则请将您的 `url` 设为 `http://yoursite.com/blog` 并把 `root` 设为 `/blog/`。

### 目录

| 参数             | 描述                                       | 默认值             |
| -------------- | ---------------------------------------- | --------------- |
| `source_dir`   | 资源文件夹，这个文件夹用来存放内容。                       | `source`        |
| `public_dir`   | 公共文件夹，这个文件夹用于存放生成的站点文件。                  | `public`        |
| `tag_dir`      | 标签文件夹                                    | `tags`          |
| `archive_dir`  | 归档文件夹                                    | `archives`      |
| `category_dir` | 分类文件夹                                    | `categories`    |
| `code_dir`     | Include code 文件夹                         | `downloads/code |
| `i18n_dir`     | 国际化（i18n）文件夹                             | `:lang`         |
| `skip_render`  | 跳过指定文件的渲染，您可使用 [glob 表达式](https://github.com/isaacs/node-glob)来匹配路径。 |                 |

### 文章

| 参数                  | 描述                                       | 默认值       |
| ------------------- | ---------------------------------------- | --------- |
| `new_post_name`     | 新文章的文件名称                                 | :title.md |
| `default_layout`    | 预设布局                                     | post      |
| `auto_spacing`      | 在中文和英文之间加入空格                             | false     |
| `titlecase`         | 把标题转换为 title case                        | false     |
| `external_link`     | 在新标签中打开链接                                | true      |
| `filename_case`     | 把文件名称转换为 (1) 小写或 (2) 大写                  | 0         |
| `render_drafts`     | 显示草稿                                     | false     |
| `post_asset_folder` | 启动 [Asset 文件夹](https://xuanwo.org/2015/03/26/hexo-intor/asset-folders.html) | false     |
| `relative_link`     | 把链接改为与根目录的相对位址                           | false     |
| `future`            | 显示未来的文章                                  | true      |
| `highlight`         | 代码块的设置                                   |           |

### 分类 & 标签

| 参数                 | 描述   | 默认值             |
| ------------------ | ---- | --------------- |
| `default_category` | 默认分类 | `uncategorized` |
| `category_map`     | 分类别名 |                 |
| `tag_map`          | 标签别名 |                 |

### 日期 / 时间格式

Hexo 使用 [Moment.js](http://momentjs.com/) 来解析和显示时间。

| 参数            | 描述   | 默认值          |
| ------------- | ---- | ------------ |
| `date_format` | 日期格式 | `MMM D YYYY` |
| `time_format` | 时间格式 | `H:mm:ss`    |

### 分页

| 参数               | 描述                    | 默认值    |
| ---------------- | --------------------- | ------ |
| `per_page`       | 每页显示的文章量 (0 = 关闭分页功能) | `10`   |
| `pagination_dir` | 分页目录                  | `page` |

### 扩展

| 参数       | 描述                    |
| -------- | --------------------- |
| `theme`  | 当前主题名称。值为`false`时禁用主题 |
| `deploy` | 部署部分的设置               |

## 配置Deployment

首先，你需要为自己配置身份信息，打开命令行，然后输入：

```
git config --global user.name "yourname"
git config --global user.email "youremail"

```

同样在`_config.yml`文件中，找到`Deployment`，然后按照如下修改：

```
deploy:
  type: git
  repo: git@github.com:yourname/yourname.github.io.git
  branch: master

```

> 如果使用git方式进行部署，执行`npm install hexo-deployer-git --save`来安装所需的插件

然后在当前目录打开命令行，输入：

```
hexo d

```

随后按照提示，分别输入自己的Github账号用户名和密码，开始上传。 然后通过http://yourname.github.io/来访问自己刚刚上传的网站。

## 添加新文章

打开Hexo目录下的`source`文件夹，所有的文章都会以md形式保存在`_post`文件夹中，只要在`_post`文件夹中新建md类型的文档，就能在执行`hexo g`的时候被渲染。 新建的文章头需要添加一些yml信息，如下所示：

```
---
title: hello-world   //在此处添加你的标题。
date: 2014-11-7 08:55:29   //在此处输入你编辑这篇文章的时间。
categories: Exercise   //在此处输入这篇文章的分类。
toc: true  //在此处设定是否开启目录，需要主题支持。
---

```

# 进阶

如果成功完成了上述的全部步骤，恭喜你，你已经搭建了一个最为简单且基础的博客。但是这个博客还非常简单， 没有个人的定制，操作也比较复杂，下面的进阶技巧将会让你获得对Hexo更为深入的了解。

## 更换主题

*可以在此处寻找自己喜欢的主题* 下载所有的主题文件，保存到Hexo目录下的`themes`文件夹下。然后在`_config.yml`文件中修改：

```
# Extensions
## Plugins: http://hexo.io/plugins/
## Themes: http://hexo.io/themes/
theme: landscape //themes文件夹中对应文件夹的名称

```

然后先执行`hexo clean`，然后重新`hexo g`，并且`hexo d`，很快就能看到新主题的效果了~

## 更换域名

首先，需要注册一个域名。在中国的话，`.cn`全都需要进行备案，如果不想备案的话，请注册别的顶级域名，可以使用[godaddy](https://www.godaddy.com/)或[新网](http://www.xinnet.com/)或[万网](http://www.xinnet.com/)中的任意一家，自己权衡价格即可。 

这里我是从是主机壳买的域名，主要这里卖moe的域名而已。在域名DNS解析管理里把CNAME类型的解析值映射到你的GitHub.io就行。

{% asset_img DNS解析.png DNS解析 %}

