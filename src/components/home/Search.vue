<template>
    <div class="searchTop">
        <svg class="icon bofang" aria-hidden="true" @click="updateSearchShow">
            <use xlink:href="#icon-xiangzuojiantou"></use>
        </svg>
        <input type="text" class="searchInput" placeholder="通过歌手/歌名搜索歌曲" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
        <h3 class="searchSpan">历史</h3>
        <div class="HsitoryText">
            <span v-for="item in keyWorkList" :key="item" class="spanKey" @click="searchHistory(item)">
                {{ item }}
            </span>
        </div>
        <svg class="icon" aria-hidden="true" @click="delHsitory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <!-- 歌单详情页列表 -->
    <div class="searchMusicList">
        <div class="itemList">
            <div class="item" v-for="(item, index) in searchList" :key="index" @click="updataIndex(item)">
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
import { mapState, mapMutations } from 'vuex'
//加载搜索接口
import { getSearchMusic } from "@/request/api/home.js"
export default {
    data() {
        return {
            keyWorkList: [],
            searchKey: "",
            searchList: []
        }
    },
    mounted() {
        // 从localStorage中获取搜索的关键字
        // 判断localStorage中是否有搜索关键字
        // 如果有，则将搜索关键字赋值给keyWorkList
        // 如果没有，则将keyWorkList赋值为空数组
        // 判断keyWorkList是否为空数组
        // 如果是空数组，则将搜索关键字赋值给keyWorkList
        // 否则，将搜索关键字添加到keyWorkList中
        // 将keyWorkList保存到localStorage中
        this.keyWorkList = JSON.parse(localStorage.getItem("keyWorkList")) ? JSON.parse(localStorage.getItem("keyWorkList")) : [];
    },
    computed:{
        ...mapState(['SearchShow'])
    },
    methods: {
        // 回车搜索
        enterKey: async function () {
            if (this.searchKey !== "") {
                //将搜索的关键字保存到数组中
                this.keyWorkList.unshift(this.searchKey);
                //去重
                this.keyWorkList = [...new Set(this.keyWorkList)];
                //固定长度
                if (this.keyWorkList.length > 10) {
                    this.keyWorkList.splice(this.keyWorkList.length - 1, 1);
                }
                // 保存到localStorage
                localStorage.setItem("keyWorkList", JSON.stringify(this.keyWorkList));

                let res = await getSearchMusic(this.searchKey);
                // console.log(res);
                this.searchList = res.data.data;

                //清空搜索框
                this.searchKey = ""
            }
        },
        delHsitory: function () {
            localStorage.removeItem("keyWorkList");
            this.keyWorkList = [];
        },
        // 点击历史记录搜索
        searchHistory: async function (item) {
            let res = await getSearchMusic(item);
            // console.log(res);
            this.searchList = res.data.data;
        },
        updataIndex:function(item){
            this.$store.commit("pushPlayList",item);
            this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1);
        },
        // 解构下方法
        ...mapMutations(['updateSearchShow',])
    }
}
</script>


<style lang="less">
.searchTop {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    background: transparent;
    border-bottom: 1px solid #999;

    input {
        width: 90%;
        height: .9rem;
        padding: 0 .2rem;
        border: none;
        outline: none;
        background: transparent !important;
    }

    .icon {
        margin-left: .2rem;
        width: .4rem;
        height: .4rem;
    }

    .searchInput {
        border: none;
        outline: none;
        background-color: #fff;
    }
}

.searchHistory {
    width: 100%;
    position: relative;

    h3 {
        font-weight: 700;
        margin: .2rem;
    }

    .HsitoryText {
        display: flex;
        /* 使用 Flex 布局 */
        flex-wrap: wrap;
        /* 允许内容换行 */

        .spanKey {
            background: #d5e7cf;
            border-radius: 20px;
            margin: .1rem;
            padding: .1rem .2rem;
        }
    }

    .icon {
        width: .36rem;
        height: .36rem;
        position: absolute;
        right: .2rem;
        top: 0rem;
    }
}

.searchMusicList {
    width: 100%;
    /*height: 100%;*/
    background-color: #f8fbf2;
    border-radius: .2rem;
    padding: .2rem;
    position: absolute;
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