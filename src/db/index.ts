import type { App } from 'vue'

import { openDB } from 'idb'
import { Reader } from '@/types'
import { bookOperate } from '@/types/symbol'
import { getBook, getAllBook, addBook, delBook, clearBook, keysBook } from './book'

async function initDataBase(app: App<Element>) {
  // 打开数据库
  await openDB<Reader>('reader', 1, {
    upgrade(db) {
      db.createObjectStore('book')
    },
  })

  // 全局注册数据库操作方法
  app.provide(bookOperate, {
    getBook,
    getAllBook,
    addBook,
    delBook,
    clearBook,
    keysBook,
  })
}

export { initDataBase }
