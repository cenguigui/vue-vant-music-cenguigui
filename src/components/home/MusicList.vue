<template>
    <div class="home_musicList">
        <!-- 首页推荐歌单 -->
        <div class="musicTop">
            <div class="title">推荐歌单</div>
            <div class="more">
                <span>更多</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo1"></use>
                </svg>
            </div>
        </div>

        <!-- 歌单列表  -->
        <div class="musicContent">
            <van-row gutter="10">
                <van-col span="8" v-for="item in musicList" :key="item">
                    <router-link :to="{ path: '/itemMusic', query:{ id: item.rid }}">
                        <img :src="item.pic" alt="">
                        <!-- 播放量 -->
                        <p class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-bofang-quanbubofang"></use>
                            </svg>
                            <span>{{ changeCount(item.listencnt) }}</span>
                        </p>
                        <!-- 歌单标题 -->
                        <p>
                            <span class="title">{{ item.name }}</span>
                        </p>
                    </router-link>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
//引入获取歌单接口请求
import { getMusicList } from '@/request/api/home.js';
import { reactive, onMounted } from 'vue';
export default {
    // vue2写法
    //     data() {
    //         return {
    //             musicList: []
    //         };
    //     },
    //     methods: {
    //         async getMusicList() {
    //             let res = await getMusicList()
    //             // console.log(res)
    //             this.musicList = res.data.data
    //             console.log(this.musicList)
    //         },
    //         // 处理播放量处理
    //         changeCount: function (num) {
    //             if (num >= 100000000) {
    //                 return (num / 10000000).toFixed(1) + '亿'
    //             } else if (num >= 10000) {
    //                 return (num / 10000).toFixed(1) + '万'

    //             }
    //         }
    //     },
    //     mounted() {
    //         this.getMusicList()
    //     },
    // Vue3写法
    setup() {
        let musicList = reactive([])
        onMounted(async () => {
            let res = await getMusicList()
            musicList.push(...res.data.data)
            // console.log(musicList)
        })

        // 处理播放量处理
        const changeCount = (num) => {
            if (num >= 100000000) {
                return (num / 10000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'

            }
        }
        return { musicList, changeCount }
    }

};
</script>

<style lang="less">
.home_musicList {
    width: 100%;
    height: 100%;
    margin-top: .2rem;
    padding: 0.2rem;
    font-weight: 900;

    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }

        .more {
            height: .5rem;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.1rem 0 .2rem;
            border-radius: 0.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #d5e7cf;

            .icon {
                width: 0.3rem;
                height: 0.25rem;
                font-weight: 900;
            }
        }
    }


    /* 歌单样式*/
    .musicContent {
        display: flex;
        justify-content: space-between;
        margin-bottom: 100px;

        .van-row {
            display: flex;
            flex-wrap: wrap;
            width: 100%;

            .van-col {
                position: relative;
                flex: 3 0 22.333333% !important;
                width: calc(33.33% - 20px) !important;
                margin-bottom: 20px;
                margin-left: 10px;
                /* 添加右边距来创建歌单项之间的间隔 */
                text-align: center;
                background: #d5e7cf;
                border-radius: 10px;
                padding-right: 0rem !important;
                padding-left: 0rem !important;

                img {
                    width: 100%;
                    height: 2rem;
                    border-radius: 5px;
                    border-radius: 10px;
                }

                .playCount {
                    margin-top: 5px;
                    font-size: 12px;
                    color: #000000;
                    display: flex;
                    position: absolute;
                    left: .1rem;
                    top: 1.3rem;
                    align-items: center;
                    background: #d5e7cf;
                    padding: 5px 2px;
                    border-radius: 20px;

                    .icon {
                        width: 16px;
                        height: 16px;
                        margin-right: 0px;
                        fill: #999;
                    }
                }

                p {
                    padding: 5px;
                    font-size: 11px;
                    color: #333;
                    text-align: center;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    max-width: 100%;
                    text-align: left;

                    .title {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        /* 控制显示的行数 */
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-wrap: break-word;
                    }

                    span {
                        padding: 0 5px;
                    }
                }

            }

            .van-col:nth-child(3n) {
                margin-right: 10px;
                /* 每行第三个元素不设置右边距，保持对齐 */
            }

        }
    }
}
</style>
