# 笒鬼鬼音乐
## 是一个基于vue3.0的移动端音乐播放器
### 使用请留个版权可好，制作不易
### 一个学校的学习项目，写得不好，大牛勿喷，还有更多功能没有写
### 2025年2月27日修复首页歌单播放量显示问题，之前只有亿和万，现在加了千和百如下：

```
/ 处理播放量处理：亿、万、千、百
        const changeCount = (num) => {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1) + '千'
            }
            else if (num >= 100) {
                return (num / 100).toFixed(1) + '百'
            }
        }
```

# 演示


<table>
  <tr>
    <td><img src="首页.png" alt="首页" width="300" height="500" /></td>
    <td><img src="歌单详情.png" alt="歌单详情" width="300" height="500" /></td>
  </tr>

<tr>
    <td><img src="搜索.png" alt="搜索" width="300" height="500" /></td>
    <td><img src="歌词.png" alt="歌词" width="300" height="500" /></td>
 </tr>

</table>





# 项目说明

## 项目运行

```
npm install
```

```
npm run serve
```

## 项目打包

```
npm run build
```

## 同时也需要安装vant

```
npm install vant --save
```
    
## axios

```
npm install axios --save
```
    
## 由于压缩的是整体包下即可运行

```
npm run serve
```

### 不会打包的可以保存demo的代码本地运行获取上传服务器运行都行
### npm安装不了的直接解压(完整包，直接run.7z)这个压缩包直接：npm run serve


### 赞赏

##### 微信 & 支付宝
<table>
  <tr>
    <td><img src="weixin.png" alt="微信" width="500" height="500" /></td>
    <td><img src="zfb.png" alt="支付宝" width="500" height="500" /></td>
  </tr>
</table>

