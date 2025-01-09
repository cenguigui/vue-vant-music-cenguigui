<template>
    <!-- 底部组件 -->
    <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].pic" alt="">
            <div class="footerTitle">
                <p>{{ playList[playListIndex].name }}</p>
                <span>{{ playList[playListIndex].artist }}</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="updateItemPlayList">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
            <span>
                <svg class="icon bofang" aria-hidden="true" @click="play" v-if="isbtnShow">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
                    <use xlink:href="#icon-zanting"></use>
                </svg>
            </span>
        </div>
        <audio ref="audio"
            :src="`https://kw-api.cenguigui.cn?id=${playList[playListIndex].rid}&type=song&format=mp3`"></audio>
    </div>
    <!-- 底部弹出 -->
    <van-popup v-model:show="deteilShow" position="bottom" :style="{ height: '100%', wdith: '100%' }">
        <MusicDetail :musicList="playList[playListIndex]" :getTime="getTime" :getTotalTime="getTotalTime" :play="play"
            :isbtnShow="isbtnShow" :addDuration="addDuration" @inputTime="inputTime" />
    </van-popup>
    <!-- 底部弹出 -->
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// 引入歌曲详情页显示
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
    data() {
        return {
            interVal: 0,
        }
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'isbtnShow', 'deteilShow','ItemPlayShow'])
    },
    mounted() {
        // console.log(this.$refs)
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].rid);
        this.updateTime()
    },
    updated() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].rid);
        this.addDuration()
    },
    methods: {
        // 将秒数转换为 mm:ss 格式
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');
            return `${formattedMinutes}:${formattedSeconds}`;
        },

        // 获取当前播放时间
        getTime() {
            const tTime = this.$refs.audio.currentTime;
            return this.formatTime(tTime);
        },
        // 获取音频总时间
        getTotalTime() {
            const totalTime = this.$refs.audio.duration;
            return this.formatTime(totalTime);
        },
        // 播放音乐
        play: function () {
            // 判断音乐是否播放
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.updateIsbtnShow(false);
                this.updateTime(); // 播放就调用函数进行传值
            } else {
                this.$refs.audio.pause();
                this.updateIsbtnShow(true);
                clearInterval(this.interVal); // 暂停清除定时器
            }
        },

        addDuration: function () {
            this.updateDuration(this.$refs.audio.duration)
        },
       inputTime(value) {
            this.updateCurrentTime(value);
            this.$refs.audio.currentTime = value;
        },
        updateTime: function () {
            this.interVal = setInterval(() => {
                setTimeout(() => {
                    this.updateCurrentTime(this.$refs.audio.currentTime)
                    // console.log(this.$refs.audio.currentTime)
                }, 0)
            }, 1000)
        },

        // 解构下方法
        ...mapMutations([
            'updateIsbtnShow',
            'updatePlayList',
            'updatePlayListIndex',
            'updateDetailShow',
            'updateCurrentTime',
            'updateDuration',
            'updateItemPlayList'
        ])
    },
    watch: {
        playListIndex: function () {//如果下标发生了改变，就自动播放音乐
            this.$refs.audio.autoplay = true
            if (this.$refs.audio.paused) {//本来是暂停状态
                this.updateIsbtnShow(false)
            }
        },
        playList: function () {//如果列表发生改变，就重新加载音乐
            if (this.isbtnShow) {
                this.$refs.audio.autoplay = true
                this.updateIsbtnShow(false)
            }
        },
        playList: function () {//如果列表发生改变，就重新加载音乐
            if (this.isbtnShow) {
                this.$refs.audio.autoplay = true
                this.updateIsbtnShow(false)
            }
        }
    },
    components: {
        MusicDetail
    }
}
</script>


<style lang="less">
.FooterMusic {
    width: 100%;
    height: 1.5rem;
    background-color: #e5ede0;
    position: fixed;
    bottom: 0;
    padding-top: .2rem;
    padding-bottom: .2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 20;

    .footerLeft {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .footerTitle {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            margin-right: 1rem;
            justify-content: center;
            align-items: start;

            p {
                width: 3rem;
                font-weight: 900;
                font-size: .32rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }

            span {
                font-size: .3rem;
                color: #999;
            }
        }

        img {
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 0.2rem;
        }
    }

    .footerRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            fill: #000;
        }

        span {
            border: 5px solid #d7e4d1;
            border-radius: .8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 0.8rem;
            height: 0.8rem;
            margin-right: 0.2rem;

            .bofang {
                width: 0.36rem;
                height: 0.36rem;
            }
        }
    }
}
</style>