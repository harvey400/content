import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/contents/2/Index.vue')
    },
    {
      path:'/1',
      name:'1',
      component: () => import('../components/contents/1/Index.vue')
    },
    {
      path:'/2',
      name:'2',
      component: () => import('../components/contents/2/Index.vue')
    }
  ]
})

export default router
