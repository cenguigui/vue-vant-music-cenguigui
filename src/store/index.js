import { createStore } from 'vuex'
import {getMusicLyric} from '@/request/api/item'

export default createStore({
  state: {
    //定义数据，播放列表
    playList: [{
      // rid: 29632463437481,
      rid: 79531914,
      name: "笒鬼鬼音乐",
      artist: '笒鬼鬼',
      pic: 'https://q4.qlogo.cn/headimg_dl?dst_uin=2963246343&spec=640',
    }],
    playListIndex: 0, //默认的下标为0
    isbtnShow: true, //暂停按钮显示
    deteilShow: false, //歌曲详情页显示
    ItemPlayShow: false, //当前播放歌曲列表显示
    SearchShow: false, //搜索框的显示
    lyricList: {}, //歌词
    currentTime: 0, //当前歌曲播放的时间
    duration: 0, //歌曲的总时长
  },
  getters: {
  },
  mutations: {
    //改变播放和暂停按钮
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },

    //搜索后点击播放
    pushPlayList: function (state, value) {
      state.playList.push(value)
    },

    //改变歌单里面的数据
    updatePlayList: function (state, value) {
      state.playList = value
      // console.log(state.playList)
    },

    //切换歌曲，切换下标
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },

    //改变歌曲详情页的显示
    updateDetailShow: function (state) {
      state.deteilShow = !state.deteilShow
    },

    //改变当前播放歌曲列表的显示
    updateItemPlayList: function (state) {
      state.ItemPlayShow = !state.ItemPlayShow
    },

    //改变搜索框的显示
    updateSearchShow: function (state) {
      state.SearchShow = !state.SearchShow
    },

    //改变歌词
    updateLyricList: function (state, value) {
      state.lyricList = value
    },

    //改变当前歌曲播放的时间
    updateCurrentTime:function (state, value) {
      // 打印获取当前播放时间
      // console.log(value)
      state.currentTime = value
    },

    //改变歌曲的总时长
    updateDuration:function (state, value) {
      state.duration = value
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      // console.log(res)
      context.commit("updateLyricList",res.data.data.lrclist)
    }
  },
  modules: {
  }
})
