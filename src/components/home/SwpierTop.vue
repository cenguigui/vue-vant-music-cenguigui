<template>
    <div id="swiperTop">
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <router-link :to="{ path: '/itemMusic', query: { id: image.id }}">
                    <img :src="image.pic" />
                </router-link>
            </van-swipe-item>
        </van-swipe>
        <!-- 轮播图 -->
    </div>
</template>

<script>
// 引入axios
import axios from 'axios';
import { getBanner } from '@/request/api/home.js';
import { reactive, onMounted } from 'vue';
export default {
    setup() {
        const state = reactive({
            images: [
                'https://kwimg3.kuwo.cn/star/upload/ecom/1682251454422.jpg',
                'https://kwimg3.kuwo.cn/star/upload/ecom/1678876050001.jpg',
                'https://kwimg3.kuwo.cn/star/upload/ecom/1678851103945.jpg',
            ]
        });
        onMounted(async () => {
            // axios.get('https://musicapi.cenguigui.cn/kw/banner/').then((res) => {
            //     console.log(res);
            //     state.images = res.data.data.banners
            //     console.log(state.images);
            // })
            // 获取封装的请求banner图接口
            let request = await getBanner()
            state.images = request.data.data.banners
            // 打印banner图
            // console.log(request);
        });
        return { state };
    },
};

</script>

<style lang="less">
#swiperTop {
    .van-swipe {
        widows: 100%;
        height: 3rem;

        .van-swipe__track{
            position: relative;
            z-index: -1;
        }

        .van-swipe-item {
            padding: 0 .3rem;

            img {
                width: 100%;
                height: 100%;
                border-radius: .2rem;
            }
        }
    }

    .van-swipe__indicator--active {
        background-color: rgb(255, 255, 255);
    }
}
</style>