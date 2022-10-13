import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/view/home/index.vue'
import Reader from '@/view/reader/index.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/reader/:id', component: Reader },
  // { path: '/:pathMatch(.*)', component: NotFoundComponent }
]

// app router
// 创建路由实例并传递 `routes` 配置
export const router = createRouter({
  // 创建一个 hash 历史记录
  history: createWebHistory(),
  routes,
})

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}
