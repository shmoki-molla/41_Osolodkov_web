import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    component: () => import('@/components/WeatherWidget.vue') 
  },
  { 
    path: '/tasks', 
    component: () => import('@/components/TaskManager.vue') 
  },
  { 
    path: '/news', 
    component: () => import('@/components/NewsFeed.vue') 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Изменили здесь
  routes
})

export default router