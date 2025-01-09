<template>
    <!-- 歌单详情页 -->
    <ItemMusicTop :playlist="state.playlist" :itemList="state.itemList" @play-all-songs="handlePlayAllSongs" />
    <ItemMusicList ref="audio" :itemList="state.itemList"/>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { mapMutations } from 'vuex';
// 引入歌单详情页
import { getMusicItemList } from '@/request/api/item.js'
// 引入子组件顶部
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
// 引入子组件列表
import ItemMusicList from '@/components/item/ItemMusicList.vue'

export default {
    setup() {
        const state = reactive({
            playlist: {}, //歌单的详情页
            itemList: [], //歌单的歌曲
        })

        const route = useRoute()
        onMounted(async () => {
            // 获取歌单id
            let result = await getMusicItemList(route.query.id)
            state.playlist = result.data.data
            // console.log(state.playlist);
            // 获取歌单的歌曲
            state.itemList = result.data.data.musicList
            //防止页面刷新，数据丢失，将数据保存在sessionStorage中
            sessionStorage.setItem('itemDetail', JSON.stringify(state))
            // 获取sessionStorage中的数据
            // console.log(sessionStorage.getItem('itemDetail'));
        })

        return { state }
    },
    components: {
        ItemMusicTop,
        ItemMusicList
    },
    methods: {
        handlePlayAllSongs(musicList) {
            // 更新Vuex store中的播放列表
            this.updatePlayList(musicList);
            // 设置当前播放索引为0
            this.updatePlayListIndex(0);
        },
        ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
    }
}
</script>

<style>
html,
body {
    background-color: #f8fbf2;
}
</style>