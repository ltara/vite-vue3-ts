<script lang="ts" setup>
import { ref, inject } from 'vue'
import Epub from 'epubjs'
import { File, BookMetaData } from '@/types'
import { bookOperate } from '@/types/symbol'

const bookMetaDataList = ref<BookMetaData[]>([])
const defaultCover = '/default-cover.jpg'
const coverUrl = ref(defaultCover)

const { getAllBook } = inject(bookOperate, {})
const books: Array<File> = await getAllBook()
const fileRead = new FileReader()
books.forEach((item) => {
  fileRead.readAsArrayBuffer(item)
  fileRead.onload = async function (e) {
    const bookData = e.target?.result as ArrayBuffer
    const book = Epub()
    await book.open(bookData)
    // 获取封面
    const cover = await book.loaded.cover
    const bookCover = await book.archive.createUrl(cover, { base64: false })
    coverUrl.value = bookCover ?? coverUrl
    // 获取元信息
    const { title, creator } = book.packaging.metadata
    bookMetaDataList.value.push({
      title,
      creator,
    })
  }
})
</script>

<template>
  <div class="home-page-container">
    <div class="bookshelf-preview-container">
      <div class="bookshelf-preview-header">
        <h2 class="bookshelf-preview-header-title">我的书架</h2>
      </div>
      <div class="bookshelf-preview-body">
        <div
          v-for="bookMetaData in bookMetaDataList"
          :key="bookMetaData.title"
          :title="bookMetaData.title"
          class="bookshelf-preview-item"
        >
          <a href="#" class="bookshelf-preview-item-link"></a>
          <div class="bookshelf-preview-item-container">
            <div class="bookshelf-preview-cover">
              <el-image :src="coverUrl" alt="书籍封面" class="book-cover-img" />
            </div>
            <div class="bookshelf-preview-content">
              <p class="bookshelf-preview-title">{{ bookMetaData.title }}</p>
              <div>
                <span class="bookshelf-preview-author">{{ bookMetaData.creator }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-page-container {
  max-width: 1332px;
  margin: 0 auto;
  .bookshelf-preview {
    &-container {
      margin-bottom: 40px;
    }
    &-header {
      overflow: hidden;
      padding: 20px 0;
      &-title {
        color: #212832;
        font-weight: 400;
        font-size: 20px;
        font-family: 'SourceHanSerifCN-Bold';
      }
    }
    &-body {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    &-item {
      position: relative;
      height: 169px;
      overflow: hidden;
      border-radius: 6px;
      width: 23.5%;
      background-color: #f6f7f9;
      &-link {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      &-container {
        display: table;
        padding: 24px;
        box-sizing: border-box;
      }
    }
    &-cover {
      display: table-cell;
      text-align: left;
      vertical-align: middle;
      width: 84px;
      height: 121px;
      box-shadow: 0 2px 16px rgb(0 0 0 / 8%);
      background: #d8d8d8;
      position: relative;
      .book-cover-img {
        vertical-align: top;
        width: 100%;
        height: 100%;
        border: 0;
        background-color: #d8d8d8;
        object-fit: cover;
      }
    }
    &-content {
      padding: 0 0 0 24px;
      display: table-cell;
      vertical-align: middle;
    }
    &-title {
      color: #0d141e;
      font-size: 16px;
      font-family: 'SourceHanSerifCN-Bold';
      line-height: 24px;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      -webkit-text-size-adjust: none;
      height: auto;
      max-height: 48px;
      word-break: break-all;
    }
    &-author {
      position: relative;
      display: inline-block !important;
      margin-top: 8px;
      font-size: 14px;
      vertical-align: bottom;
      color: #858c96;
      line-height: 22px;
      overflow: hidden;
      height: 22px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      -webkit-text-size-adjust: none;
      height: auto;
      max-height: 22px;
    }
  }
}
</style>
