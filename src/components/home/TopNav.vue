<template>
    <!-- 首页 -->
    <div class="topNav">
        <!-- 搜索框 -->
        <input type="text" placeholder="通过歌手/歌名搜索歌曲" class="search" @click="updateSearchShow">
        <!-- 搜索按钮 -->
        <svg class="icon left" aria-hidden="true" @click="updateSearchShow">
            <use xlink:href="#icon-sousuo"></use>
        </svg>
        <!-- 更多按钮 -->
        <svg class="icon right" aria-hidden="true">
            <use xlink:href="#icon-gengduo"></use>
        </svg>
    </div>
    <van-popup v-model:show="SearchShow" position="top" :style="{ height: '100%' }" class="search-swipe">
        <Search />
    </van-popup>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import Search from '@/components/home/Search.vue'
export default {
    computed: {
        ...mapState(['SearchShow'])
    },
    methods: {
        // 解构下方法
        ...mapMutations(['updateSearchShow',])
    },
    components: {
        Search
    }
}
</script>

<style lang="less">
.topNav {
    width: 100%;
    height: 1.8rem;
    position: sticky;
    top: -0.02rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fbf2;
    margin-top: -0.02rem;
    z-index: 1;

    .search {
        width: 90%;
        height: 1rem;
        border: none;
        background: #e6e9e2;
        border-radius: 1rem;
        padding-left: .2rem;
        outline: none;
        padding-left: 1rem;
        font-weight: 900;
    }

    .left {
        position: absolute;
        top: .2rem;
        right: 6.4rem;
        top: 50%;
        transform: translate(0, -50%);
    }

    .right {
        position: absolute;
        top: .2rem;
        left: 6.4rem;
        top: 50%;
        transform: translate(0, -50%);
    }
}

.van-popup {
    background: #f8fbf2 !important;
}

.van-overlay {
    z-index: 2 !important;
}

.search-swipe {
    z-index: 2 !important;
}
</style>