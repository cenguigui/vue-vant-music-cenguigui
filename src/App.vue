<template>
  <router-view/>
  <FooterMusic/>
</template>

<script>
import FooterMusic from './components/item/FooterMusic.vue'
export default {
  components: {
    FooterMusic
  }
}

</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  background: #f8fbf2;
}
#app{
  font-family: '楷体';
}


.icon {
  width: .5rem;
  height: .5rem;
}
</style>
