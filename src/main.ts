import { createApp } from 'vue'
import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import './style/index.css'
import db from './db/index'
import { bookOperate } from '@/types/symbol'

db.init()

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const { getBook, getAllBook, addBook, delBook, clearBook, keysBook } = db
// getBook, addBook, delBook, clearBook, keysBook
app.provide(bookOperate, {
  getBook,
  getAllBook,
  addBook,
  delBook,
  clearBook,
  keysBook,
})

app.use(ElementPlus)
app.mount('#app')
