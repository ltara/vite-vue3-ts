import { DBSchema } from 'idb'

export interface File extends Blob {
  uid: number
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

export interface Reader extends DBSchema {
  book: {
    key: string
    value: File
    indexes: {
      'by-lastModified': number
      'by-name': string
      'by-size': string
      'by-type': string
    }
  }
}

export interface BookOperate {
  [index: string]: Function
}

export interface BookMetaData {
  creator: string
  title: string
}
