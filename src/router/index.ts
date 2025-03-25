import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'help',
      component: () => import('../views/Help.vue'),
    },
    {
      path: '/HADS',
      name: 'hads',
      component: () => import('../views/HADS.vue'),
    },
    {
      path: '/DASS-21',
      name: 'dass21',
      component: () => import('../views/DASS21.vue'),
    },
  ],
})

export default router
