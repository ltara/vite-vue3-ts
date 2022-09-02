import { openDB } from 'idb'
import { Reader, File } from '@/types'

const db = await openDB<Reader>('reader', 1)

export async function getBook(key: string) {
  return db.get('book', key)
}
export async function getAllBook() {
  return db.getAll('book')
}
export async function addBook(key: string, val: File) {
  return db.put('book', val, key)
}
export async function delBook(key: string) {
  return db.delete('book', key)
}
export async function clearBook() {
  return db.clear('book')
}
export async function keysBook() {
  return db.getAllKeys('book')
}
