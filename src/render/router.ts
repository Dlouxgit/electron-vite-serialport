import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from './views/Index.vue'
// import Create from './views/Create.vue'
import Create from './views/serialport/index'

const routes: RouteRecordRaw[] = [
  {
      path: '/',
      name: 'index',
      component: Index as any,
      meta: {
          title: '首页'
      }
  },
  {
      path: '/create',
      name: 'create',
      component: Create as any,
      meta: {
          title: '创建'
      }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes 
})

export default router
