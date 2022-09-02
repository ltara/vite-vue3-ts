import { InjectionKey } from 'vue'
import { BookOperate } from './index'
const bookOperate: InjectionKey<BookOperate> = Symbol('Book')

export { bookOperate }
