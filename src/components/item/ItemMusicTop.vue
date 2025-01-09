<template>
    <!-- 歌单详情页顶部 -->
    <div class="itemMusicTop" ref="topSection">
        <!-- 顶部banner -->
        <img :src="playlist.img700" alt="" class="bgimg" :style="{ height: bgImgHeight }">
        <!-- 蒙层遮罩 -->
        <div class="Masking"></div>
        <!-- 左上角图标 -->
        <div class="itemLeft" @click="$router.go(-1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangzuojiantou"></use>
            </svg>
        </div>
        <!-- 右上角播放全部按钮图标 -->
        <div class="itemRight" @click="playAllSongs">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang-quanbubofang"></use>
            </svg>
        </div>
        <!-- 左下角信息 -->
        <div class="title" :style="{ left: titleLeft, top: titleTop }">
            <span>歌单详情</span>
            <p>{{ playlist.name }}</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup(props) {
        // 图片高度
        const bgImgHeight = ref('5rem');
        // 标题位置
        const titleLeft = ref('0.4rem');
        // 标题位置
        const titleTop = ref('3rem');

        onMounted(() => {
            // 获取元素
            const topSection = document.querySelector('.itemMusicTop');
            const title = document.querySelector('.title p');
            const bgimg = document.querySelector('.bgimg');
            const Masking = document.querySelector('.Masking');

            if (topSection && title) {
                const handleScroll = () => {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    if (scrollTop > 0) {
                        // 页面向下滚动时改变样式
                        bgImgHeight.value = '2rem';
                        bgimg.style.filter = 'blur(0.1rem)';
                        titleLeft.value = '1.4rem';
                        titleTop.value = '10px';
                        title.style.marginTop = '0.1rem'; // 修改margin-top样式
                        Masking.style.height = '1.9rem';
                    } else {
                        // 页面滚动到顶部时恢复原始样式
                        bgImgHeight.value = '5rem';
                        bgimg.style.filter = 'blur(0.1rem)';
                        titleLeft.value = '0.4rem';
                        titleTop.value = '3rem';
                        title.style.marginTop = '0.5rem'; // 恢复原始margin-top样式
                        Masking.style.height = '5rem';
                    }
                };
                window.addEventListener('scroll', handleScroll);
                // 清除监听器以避免内存泄漏
                return () => {
                    window.removeEventListener('scroll', handleScroll);
                };
            }
        });

        return { bgImgHeight, titleLeft, titleTop };
    },
    props: ['playlist'],
    methods: {
        playAllSongs() {
            // 向父组件发送事件,传递歌单列表
            this.$emit('play-all-songs', this.playlist.musicList);
        }
    }
};
</script>

<style scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    transition: all .3s;
}

.itemLeft,
.itemRight {
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .2rem;
    transition: all .3s;
}

.Masking {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(248, 251, 242, 0.9));
    /* 设置透明顶部至底部的渐变色 */
    transition: all .3s;
    z-index: -1;
}

.bgimg {
    width: 100%;
    height: 5rem;
    position: fixed;
    z-index: -1;
    top: 0;
    -o-object-fit: cover;
    object-fit: cover;
    transition: all .3s;
    top: -0.2rem;
    filter: blur(0.1rem);
}



.title {
    position: absolute;
    width: 100%;
    height: 1rem;
    left: 0.4rem;
    /* 默认值 */
    top: 4rem;
    /* 默认值 */
    color: #000000;
    z-index: 2;

    span {
        font-size: .6rem;
        font-weight: 900;
    }

    p {
        margin-top: .5rem;
        font-size: 15px;
    }
}
</style>