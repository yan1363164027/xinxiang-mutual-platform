
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/animate',
      name: 'animate',
      component: () => import('../components/Animate.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/PostHelp.vue')
    },
    {
      path: '/403',
      name: '403',
      component: () => import('../views/403.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: 'active-router'
  })

export default router