<template>
    <!-- 背景图 -->
    <img :src="musicList.pic" alt="" class="bgimg">
    <!-- 顶部返回导航 -->
    <div class="detailTopLeft" @click="updateDetailShow">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangxia"></use>
        </svg>
    </div>
    <!-- 中间图片和歌词 -->
    <!-- 磁盘 -->
    <div class="detailTop" v-show="!isLyricShow">
        <div class="centenImg">
            <img :src="musicList.pic" alt="" @click="isLyricShow = true">
        </div>
    </div>
    <!-- 歌词 -->
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow = false">
        <p v-for="item in lyric" :key="item"
            :class="{ active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.pre) }">
            {{ item.lrc }}
        </p>
    </div>
    <!-- 底部盒子 -->
    <div class="detailFooter">
        <div class="footerTop">
            <p class="title_ame">{{ musicList.name }}</p>
            <p class="itle_artist">{{ musicList.artist }}</p>
        </div>
        <!-- 进度条 -->
        <div class="footerProgress">
            <input type="range" class="range" min="" :max="duration" step="0.05" v-model="currentTime"
                @input="inputTime">
            <div class="leftAndRightTime">
                <span> {{ getTime() }}</span>
                <span>{{ getTotalTime() }}</span>
            </div>
        </div>
        <!-- 底部按钮 -->
        <div class="footerBottom">
            <!-- 上一首按钮 -->
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyiqu101"></use>
            </svg>
            <div class="footerPay">
                <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
                    <use xlink:href="#icon-bofang"></use>
                </svg>

                <svg class="icon" aria-hidden="true" @click="play" v-else>
                    <use xlink:href="#icon-zanting"></use>
                </svg>
            </div>
            <!-- 下一首按钮 -->
            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayiqu101"></use>
            </svg>
        </div>
    </div>
    <!-- 当前播放列表 -->

    <!-- 播放列表 -->
    <div class="fooerterListBOx" @click="updateItemPlayList">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangshang"></use>
        </svg>
        <span>当前播放列表</span>
    </div>
    <!-- 当前播放列表 -->
    <van-popup v-model:show="ItemPlayShow" position="bottom" :style="{ height: '100%' }">
        <ItemPlayList />
    </van-popup>
</template>

<script>
import { mapMutations, mapState } from 'vuex';  // 引入vuex的辅助函数

//当前播放列表
import ItemPlayList from '@/components/item/ItemPlayList.vue';

export default {
    data() {
        return {
            isLyricShow: false,
        }
    },
    computed: {
        ...mapState(['lyricList', 'currentTime', 'playListIndex', 'playList', 'duration', 'ItemPlayShow']),
        lyric: function () {
            let arr = [];
            if (this.lyricList) {
                // 使用 map 方法遍历歌词列表
                arr = this.lyricList.map(item => {
                    // 获取歌词文本
                    let lrc = item.lineLyric;
                    // 获取时间
                    // 获取时间字符串
                    // 乘以1000并转换成字符串，确保保留后面的零
                    //歌词耗时间，累死~
                    let time = parseInt((item.time) * 1000)
                    // 返回处理后的歌词对象
                    // console.log(time);
                    return { time, lrc };
                })
                //下一句歌词时间
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 100000;
                    } else {
                        item.pre = arr[i + 1].time;
                    }
                });
            }
            // 返回处理后的歌词数组
            // console.log(arr);
            return arr;
        }
    },
    mounted() {
        // 打印歌词
        // console.log(this.lyricList);
        this.addDuration();
    },
    props: ['musicList', 'getTime', 'getTotalTime', 'play', 'isbtnShow', 'addDuration'],
    methods: {
        goPlay: function (num) {
            let index = this.playListIndex + num
            if (index < 0) {
                index = this.playList.length - 1
            } else if (index == this.playList.length) {
                index = 0
            }
            this.updatePlayListIndex(index)
        },
        inputTime(event) {
            this.$emit('inputTime', event.target.value);
        },

        ...mapMutations(['updateDetailShow', 'updatePlayListIndex', 'updateItemPlayList'])
    },
    watch: {
        // 人工生成的，自己写的播放完报错，很多报错
        currentTime: function (newValue) {
            let activeP = document.querySelector("p.active");
            let nextP = activeP ? activeP.nextElementSibling : null;

            // 拿到这个p标签和active后再去执行
            if (activeP) {
                if (nextP && nextP.offsetTop > 250 && this.$refs.musicLyric) {
                    const musicLyric = this.$refs.musicLyric;

                    // 平滑滚动到下一个歌词位置
                    musicLyric.style.scrollBehavior = "auto"; // 关闭原生滚动动画
                    let start = null;
                    const duration = 380; // 滚动持续时间，单位毫秒
                    const startPosition = musicLyric.scrollTop;
                    const targetPosition = nextP.offsetTop - 250;
                    const distance = targetPosition - startPosition;

                    const cubicBezier = t => (1 - t) ** 3 * 0 + 3 * (1 - t) ** 2 * t * 0.5 + 3 * (1 - t) * t ** 2 * 0.5 + t ** 3 * 1;

                    const animateScroll = timestamp => {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const nextScrollPosition = startPosition + distance * cubicBezier(Math.min(progress / duration, 1)); // 使用三次贝塞尔曲线缓动函数
                        if (musicLyric) {
                            musicLyric.scrollTop = nextScrollPosition;
                        }
                        if (progress < duration && musicLyric) {
                            requestAnimationFrame(animateScroll);
                        } else if (musicLyric) {
                            musicLyric.style.scrollBehavior = "smooth"; // 恢复原生平滑滚动动画
                        }
                    };
                    requestAnimationFrame(animateScroll);
                }
            }
            // 如果歌曲播放完毕，自动播放下一曲
            if (newValue === this.duration) {
                // 如果下一曲是最后一首，则自动播放第一首
                if (this.playListIndex === this.playList.length - 1) {
                    this.updatePlayListIndex(0);
                    this.play()
                } else {
                    this.updatePlayListIndex(this.playListIndex + 1);
                }
            }
        },

    },
    components: {
        ItemPlayList
    }
}
</script>

<style lang="less">
.bgimg {
    width: 100%;
    height: 70%;
    position: absolute;
    z-index: -1;
    filter: blur(.4rem);
    object-fit: cover;
}

.detailTopLeft {
    display: flex;
    justify-content: center;
    margin-top: .4rem;

    .icon {
        fill: #39683a;
    }
}

.detailTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: center;
    padding: .2rem;
    margin-top: .2rem;



    .centenImg {
        width: 5.6rem;
        height: 5.6rem;
        border-radius: 50%;
        overflow: hidden;
        /* 使用固定定位 */
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        /* 添加边框样式 */
        border: .1rem solid #e5ede0;

    }

    .centenImg img {
        /* 让图片填充整个容器 */
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
}

/* 歌词样式 */
.musicLyric {
    width: 100%;
    height: 7rem;
    display: flex;
    margin-top: .2rem;
    flex-direction: column;
    text-align: center;
    /* 当内容溢出时，启用滚动条，以便查看超出的内容 */
    overflow: scroll;

    p {
        color: #39683a;
        /* color: #fff; */
        margin-bottom: .6rem;
        font-size: .3rem;
        font-weight: 700;
    }

    .active {
        color: #ff0000;
        font-size: .5rem;
    }

    /*设置滚动条为透明*/
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}

/*底部盒子左上角和右上角圆角*/
.detailFooter {
    width: 100%;
    height: 5rem;
    position: fixed;
    bottom: 0;
    background-color: #e5ede0;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    display: flex;
    flex-direction: column;
    text-align: center;

    /*p标签位于盒子顶部水平居中 */
    .footerTop {

        .title_ame {
            font-size: .3rem;
            margin-top: .4rem;
            color: #000;
            font-weight: 700;
        }

        .itle_artist {
            font-size: .25rem;
            color: #000;
            margin-top: .2rem;
        }
    }

    .footerProgress {
        margin-top: 0.4rem;

        /* 进度条整体样式 */
        .range {
            appearance: none;
            margin: 0;
            outline: 0;
            background-color: transparent;
            width: 7rem;

            /* 进度条轨道样式 */
            &::-webkit-slider-runnable-track {
                height: .08rem;
                background: #999;
            }

            /* 控制进度条容器样式 */
            &::-webkit-slider-container {
                height: .3rem;
                overflow: hidden;
            }

            /* 滑块样式 */
            &::-webkit-slider-thumb {
                appearance: none;
                width: .1rem;
                /* 调整滑块宽度，使其保持长方形形状 */
                height: .4rem;
                border-radius: 1rem;
                /* 调整滑块高度，保持与滑块轨道高度一致 */
                background-color: #39683a;
                border: 1px solid transparent;
                margin-top: -8px;
                /* 可以根据需要微调垂直居中效果 */
                /* 调整滑块左侧间距，使其与滑块轨道对齐 */
                /* 使用border-image属性给滑块添加渐变边框 */
                border-image: linear-gradient(#39683a, #39683a) 0 fill / 9 5 9 0 / 0px 0px 0 2000px;
            }
        }

        .leftAndRightTime {
            display: flex;
            justify-content: space-between;
            width: 90%;
            font-size: .25rem;
            color: #000;
            margin: auto;
        }
    }

    /* 底部按钮 */
    .footerBottom {
        /* margin-top: 0.4rem; */
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: .2rem;

        .footerPay {
            background: #39683a;
            border-radius: .4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1rem;
            height: 1rem;

            .icon {
                fill: #fff;
                width: 0.36rem;
                height: 0.36rem;
            }
        }

    }
}

/*底部歌曲列表盒子*/
.fooerterListBOx {
    width: 100%;
    height: 1.1rem;
    position: fixed;
    bottom: 0;
    background-color: #d5e7cf;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    display: flex;
    flex-direction: column;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
        fill: #000;
        width: .3rem;
        height: .3rem;
    }

    span {
        margin-top: .1rem;
        color: #000;
    }
}
</style>