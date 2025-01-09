<template>
    <!-- 歌单详情页列表 -->
    <div class="musicList">
        <div class="itemList">
            <div class="item" v-for="(item, index) in itemList" :key="index" @click="playMusic(index)">
                <img :src="item.pic" alt="">
                <span class="item_Name_Right">
                    <span>{{ item.name }}</span>
                    <p>{{ item.artist }}</p>
                </span>
            </div>
        </div>
    </div>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            currentIndex: -1 // 初始化为-1,表示未选中任何歌曲
        }
    },
    setup(props) {
        // console.log(props);
    },
    props: ['itemList'],
    methods: {
        playMusic: function (index) {
            this.updatePlayList(this.itemList)
            this.updatePlayListIndex(index)
        },
        ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
    }
}

</script>



<style lang="less">
.musicList {
    width: 100%;
    /*height: 100%;*/
    background-color: #f8fbf2;
    border-radius: .2rem;
    margin-top: 1rem;
    padding: .2rem;
    position: absolute;
    top: 4rem;
    padding: 0 0.2rem;
    border-top-left-radius: 0.4rem;
    border-top-left-radius: 0.4rem;
    z-index: -1;
    pointer-events: auto;


    .itemList {
        display: flex;
        flex-direction: column;
        padding: .2rem;
        margin-bottom: 1rem;

        .item {
            display: flex;
            align-items: center;
            margin-bottom: .4rem;

            img {
                width: 1rem;
                /* 调整图片宽度 */
                height: auto;
                /* 自适应高度 */
                border-radius: .3rem;
                /* 添加圆角 */
            }

            .item_Name_Right {
                flex: 1;
                /* 文字信息占据剩余空间 */
                font-size: .32rem;
                /* 调整文字大小 */
                color: #333;
                /* 文字颜色 */
                margin-left: .4rem;


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
    }
}
</style>