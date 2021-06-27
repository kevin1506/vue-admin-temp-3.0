import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import home from '../views/home.vue'
// () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '主页'
        },
        component: home
      }
      // {
      //   path: '/control',
      //   name: 'control',
      //   meta: {
      //     title: '控件库'
      //   },
      //   component: resolve => require(['./views/controlManage/control'], resolve)
      // },
      // {
      //   path: '/temp',
      //   name: 'temp',
      //   meta: {
      //     title: '模板库'
      //   },
      //   component: resolve => require(['./views/tempManage/temp'], resolve)
      // },
      // {
      //   path: '/project-hub',
      //   name: 'project-hub',
      //   meta: {
      //     title: '项目仓库'
      //   },
      //   component: resolve => require(['./views/projectHub/projectHub'], resolve)
      // }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/home',
    component: home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
