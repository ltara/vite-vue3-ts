import { openDB } from 'idb'
import { Reader } from '@/types'

async function initDataBase() {
  await openDB<Reader>('reader', 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const bookStore = db.createObjectStore('book')
      bookStore.createIndex('by-lastModified', 'lastModified')
    },
  })
}

export default initDataBase
