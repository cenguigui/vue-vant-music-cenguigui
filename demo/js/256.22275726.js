"use strict";(self["webpackChunkmusickw"]=self["webpackChunkmusickw"]||[]).push([[256],{9256:function(t,e,s){s.r(e),s.d(e,{default:function(){return R}});var i=s(6768);function l(t,e,s,l,a,n){const r=(0,i.g2)("ItemMusicTop"),u=(0,i.g2)("ItemMusicList");return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.bF)(r,{playlist:l.state.playlist,itemList:l.state.itemList,onPlayAllSongs:n.handlePlayAllSongs},null,8,["playlist","itemList","onPlayAllSongs"]),(0,i.bF)(u,{ref:"audio",itemList:l.state.itemList},null,8,["itemList"])],64)}var a=s(1387),n=s(144),r=s(782),u=s(8131),o=s(4232);const c=t=>((0,i.Qi)("data-v-426b5a00"),t=t(),(0,i.jt)(),t),m={class:"itemMusicTop",ref:"topSection"},d=["src"],p=c((()=>(0,i.Lk)("div",{class:"Masking"},null,-1))),L=c((()=>(0,i.Lk)("svg",{class:"icon","aria-hidden":"true"},[(0,i.Lk)("use",{"xlink:href":"#icon-xiangzuojiantou"})],-1))),y=[L],g=c((()=>(0,i.Lk)("svg",{class:"icon","aria-hidden":"true"},[(0,i.Lk)("use",{"xlink:href":"#icon-bofang-quanbubofang"})],-1))),k=[g],v=c((()=>(0,i.Lk)("span",null,"歌单详情",-1)));function h(t,e,s,l,a,n){return(0,i.uX)(),(0,i.CE)("div",m,[(0,i.Lk)("img",{src:s.playlist.img700,alt:"",class:"bgimg",style:(0,o.Tr)({height:l.bgImgHeight})},null,12,d),p,(0,i.Lk)("div",{class:"itemLeft",onClick:e[0]||(e[0]=e=>t.$router.go(-1))},y),(0,i.Lk)("div",{class:"itemRight",onClick:e[1]||(e[1]=(...t)=>n.playAllSongs&&n.playAllSongs(...t))},k),(0,i.Lk)("div",{class:"title",style:(0,o.Tr)({left:l.titleLeft,top:l.titleTop})},[v,(0,i.Lk)("p",null,(0,o.v_)(s.playlist.name),1)],4)],512)}var f={setup(t){const e=(0,n.KR)("5rem"),s=(0,n.KR)("0.4rem"),l=(0,n.KR)("3rem");return(0,i.sV)((()=>{const t=document.querySelector(".itemMusicTop"),i=document.querySelector(".title p"),a=document.querySelector(".bgimg"),n=document.querySelector(".Masking");if(t&&i){const t=()=>{const t=window.scrollY||document.documentElement.scrollTop;t>0?(e.value="2rem",a.style.filter="blur(0.1rem)",s.value="1.4rem",l.value="10px",i.style.marginTop="0.1rem",n.style.height="1.9rem"):(e.value="5rem",a.style.filter="blur(0.1rem)",s.value="0.4rem",l.value="3rem",i.style.marginTop="0.5rem",n.style.height="5rem")};return window.addEventListener("scroll",t),()=>{window.removeEventListener("scroll",t)}}})),{bgImgHeight:e,titleLeft:s,titleTop:l}},props:["playlist"],methods:{playAllSongs(){this.$emit("play-all-songs",this.playlist.musicList)}}},b=s(1241);const I=(0,b.A)(f,[["render",h],["__scopeId","data-v-426b5a00"]]);var P=I;const S={class:"musicList"},w={class:"itemList"},C=["onClick"],T=["src"],A={class:"item_Name_Right"};function M(t,e,s,l,a,n){return(0,i.uX)(),(0,i.CE)("div",S,[(0,i.Lk)("div",w,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.itemList,((t,e)=>((0,i.uX)(),(0,i.CE)("div",{class:"item",key:e,onClick:t=>n.playMusic(e)},[(0,i.Lk)("img",{src:t.pic,alt:""},null,8,T),(0,i.Lk)("span",A,[(0,i.Lk)("span",null,(0,o.v_)(t.name),1),(0,i.Lk)("p",null,(0,o.v_)(t.artist),1)])],8,C)))),128))])])}var x={data(){return{currentIndex:-1}},setup(t){},props:["itemList"],methods:{playMusic:function(t){this.updatePlayList(this.itemList),this.updatePlayListIndex(t)},...(0,r.PY)(["updatePlayList","updatePlayListIndex"])}};const E=(0,b.A)(x,[["render",M]]);var q=E,_={setup(){const t=(0,n.Kh)({playlist:{},itemList:[]}),e=(0,a.lq)();return(0,i.sV)((async()=>{let s=await(0,u.V)(e.query.id);t.playlist=s.data.data,t.itemList=s.data.data.musicList,sessionStorage.setItem("itemDetail",JSON.stringify(t))})),{state:t}},components:{ItemMusicTop:P,ItemMusicList:q},methods:{handlePlayAllSongs(t){this.updatePlayList(t),this.updatePlayListIndex(0)},...(0,r.PY)(["updatePlayList","updatePlayListIndex"])}};const K=(0,b.A)(_,[["render",l]]);var R=K}}]);
//# sourceMappingURL=256.22275726.js.map