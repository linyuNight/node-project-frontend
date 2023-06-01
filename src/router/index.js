import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/diary',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '/diary',
        name: 'diary',
        component: () => import('@/views/home/Diary.vue'),
      },
      {
        path: '/tools',
        name: 'tools',
        component: () => import('@/views/home/Tools.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
