function remSize() {
    // 获取设备的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (deviceWidth >= 750) {
        deviceWidth = 750;
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320;
    }
    // 750px-->1rem=100px,320px-->1rem=50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
    document.querySelector('body').style.fontSize = 0.24 + 'rem';
}
remSize();
//当我的窗口发生变化调用，进行适配
window.onresize = function () {
    remSize();
}

// 请留个版权看好
console.log(
    "\n%c %c %c" + " ✰ " + " 笒鬼鬼音乐 " + " ✰ " + " %c  %c  https://blog.cenguigui.cn/137.html  %c %c ♥%c♥%c♥ \n\n",
    "background: #ff66a5; padding:5px 0;",
    "background: #ff66a5; padding:5px 0;",
    "color: #ff66a5; background: #030307; padding:5px 0;",
    "background: #ff66a5; padding:5px 0;",
    "background: #ffc3dc; padding:5px 0;",
    "background: #ff66a5; padding:5px 0;",
    "color: #ff2424; background: #fff; padding:5px 0;",
    "color: #ff2424; background: #fff; padding:5px 0;",
    "color: #ff2424; background: #fff; padding:5px 0;"
)