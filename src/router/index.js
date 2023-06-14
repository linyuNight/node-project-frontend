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
        redirect: '/diary/hello',
        component: () => import('@/views/home/diary/index.vue'),
        children: [
          {
            path: '/diary/hello',
            name: 'hello',
            component: () => import('@/views/home/diary/Hello.vue')
          },
          {
            path: '/diary/room/:id',
            name: 'room',
            component: () => import('@/views/home/diary/Room.vue')
          }
        ]
      },
      {
        path: '/tools',
        name: 'tools',
        component: () => import('@/views/home/tools/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('@/views/regist/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
