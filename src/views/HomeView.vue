<template>
    <!-- 顶部搜索 -->
    <TopNav />
    <!-- 轮播图 -->
    <SwpierTop />
    <!-- 推荐歌单 -->
    <MusicList />
</template>

<script>
// @ is an alias to /src
// 顶部搜索
import TopNav from '@/components/home/TopNav.vue';
// 轮播图
import SwpierTop from '@/components/home/SwpierTop.vue';
//推荐歌单
import MusicList from '@/components/home/MusicList.vue';

export default {
    components: {
        TopNav,
        SwpierTop,
        MusicList,
    }
}
</script>
