# hexo-tabbed-code-blocks


# Install

```sh
npm install holmofy/hexo-tabbed-code-block
```

# config

`_config.yml` add :
```yaml
# hexo highlight config
highlight:
  enable: true
  # ref: https://github.com/hexojs/hexo-util#highlightstr-options
  line_number: true
  tab_replace: ' '
  auto_detect: false
# tabbed code
tabbedCodeBlock:
  enable: true
  merge: true
```

**note:** tabbedCodeBlock enable means to open globally. Support to enable on a single page, this is more recommended.

````markdown
---
title: hello-world
date: 2021-11-01
categories: demo
tabbedCodeBlock: true
---

```java
System.out.println("Hello World");
```
````

# How to user it?

**multi language code block**
````markdown
```c
printf("Hello World");
```

```java
System.out.println("Hello World");
```
````

Multi adjacent code blocks will be automatically merged into one tabbed code block. like this

![demo](https://user-images.githubusercontent.com/19494806/121777704-0737e980-cbc6-11eb-9ff7-bc13c861180c.gif)

**multi code block with title**
````markdown
```bash Debein
apt install pcre2-utils
```

```bash MacOS
brew install pcre
```

```bash CentOS
yum install pcre
```
````

![2021-11-01 23 56 29](https://user-images.githubusercontent.com/19494806/139701486-10ad2450-7de1-4029-8bba-7de0c463b7fb.gif)


# Options

// TODO:
