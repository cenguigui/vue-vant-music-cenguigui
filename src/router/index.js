import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: () => import('../views/ItemMusic.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(), // 使用 createWebHashHistory
  routes
})

export default router