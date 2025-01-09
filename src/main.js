import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件-插件
import getVant from './plugins/'



const app = createApp(App)
// 全局挂载vant组件
getVant(app)
app.use(store)
app.use(router).mount('#app')
