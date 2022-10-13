import { createApp } from 'vue'
import { setupRouter } from './routes'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { initDataBase } from './db/index'
import App from './App.vue'
import 'normalize.css'
import 'element-plus/dist/index.css'
import './style/index.css'

async function bootstrap() {
  const app = createApp(App)

  // 初始化数据库
  await initDataBase(app)

  // 注册全局组件
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(ElementPlus)

  // 配置路由
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
