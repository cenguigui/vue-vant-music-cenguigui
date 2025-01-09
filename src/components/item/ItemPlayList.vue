<template>
    <!-- 当前播放列表 -->
    <!-- 播放列表 -->
    <div class="ItemPlayListBOx">
        <div class="ItemPlayTop" @click="updateItemPlayList">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangxia"></use>
            </svg>
            <span>当前播放列表</span>
        </div>
        <div class="item" v-for="(item, index) in playList" :key="item">
            <span class="item_Name_Right">
                <span>{{ item.name }}</span>
                <p>{{ item.artist }}</p>
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapState(['ItemPlayShow', 'playList'])
    },
    methods: {
        // 解构下方法
        ...mapMutations(['updateItemPlayList', 'playListIndex',])
    }
}
</script>

<style lang="less">
/*底部歌曲列表盒子*/
.ItemPlayListBOx {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    background-color: #d5e7cf;
    display: flex;
    flex-direction: column;
    text-align: center;
    display: flex;
    align-items: center;
    z-index: 99;

    .ItemPlayTop {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        top: 10px;

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

    .item {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        margin-top: .2rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        font-size: .32rem;
        color: #333;
        /* 文字颜色 */
        margin-left: .4rem;
        /* 文字距离左侧距离 */
    }

    .item_Name_Right {
        /* 文字信息占据剩余空间 */
        font-size: .32rem;
        /* 调整文字大小 */
        color: #333;
        /* 文字颜色 */
        margin-left: .4rem;
        margin-top: .2rem;
        text-align: left;
        


        span {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-weight: 600;
        }

        p {
            font-size: .28rem;
            color: #999;
            margin-top: .1rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-weight: 900;
            font-size: .28rem;
            color: #999;
            margin-top: .1rem;
        }
    }
}
</style>