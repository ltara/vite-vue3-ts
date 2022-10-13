<script lang="ts" setup>
import { ref, inject } from 'vue'
import { router } from '@/routes'
import Epub from 'epubjs'
import md5 from 'md5'
import { File, BookMetaData } from '@/types'
import { bookOperate } from '@/types/symbol'
const { getAllBook } = inject(bookOperate, {})

// 从数据库获取所有书籍数据
const books: Array<File> = await getAllBook()

// 初始化书籍元信息列表
const bookMetaDataList = ref<BookMetaData[]>([])

// 收集所有书籍元信息
readBookMetaData(books, 4)

/**
 * 读取书籍元信息
 * @param books 书籍数据
 * @param index 书籍索引，展示数量
 */
function readBookMetaData(books: Array<File>, index: number) {
  if (index > 0) {
    const fileRead = new FileReader()
    fileRead.readAsArrayBuffer(books[index])
    fileRead.onload = async function (e) {
      const bookData = fileRead.result as ArrayBuffer
      const book = Epub()
      await book.open(bookData)
      // 获取封面
      const defaultCover = '/default-cover.jpg' // 默认封面
      const cover = await book.loaded.cover
      const bookCover = await book.archive.createUrl(cover, { base64: false })
      const coverUrl = bookCover ?? defaultCover
      // 获取书名、作者
      const { title, creator } = book.packaging.metadata
      // 生成id
      const id = md5(title)
      bookMetaDataList.value.push({
        id,
        creator,
        title,
        coverUrl,
      })
      readBookMetaData(books, --index)
    }
  }
}

/**
 * 跳转到对应的书籍阅读页
 * @param id 书籍ids
 */
function HandleGoReaderPage(id: string) {
  router.push(`/reader/${id}`)
}
</script>

<template>
  <div class="home-page-container">
    <div class="bookshelf-preview-container">
      <div class="bookshelf-preview-header">
        <h2 class="bookshelf-preview-header-title">我的书架</h2>
        <a href="#" class="bookshelf-preview-header-link">
          <span>查看我的书架</span>
        </a>
      </div>
      <div class="bookshelf-preview-body">
        <div
          v-for="bookMetaData in bookMetaDataList"
          :key="bookMetaData.id"
          :title="bookMetaData.title"
          class="bookshelf-preview-item"
          :class="!bookMetaData.id ? 'bookshelf-preview-item-empty' : ''"
        >
          <a
            href="#"
            class="bookshelf-preview-item-link"
            @click="HandleGoReaderPage(bookMetaData.id)"
          ></a>
          <div class="bookshelf-preview-item-container">
            <div class="bookshelf-preview-cover">
              <el-image :src="bookMetaData.coverUrl" alt="书籍封面" class="book-cover-img" />
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
      &-link {
        display: flex;
        align-items: center;
        float: right;
        margin-top: -24px;
        font-size: 15px;
        color: #5d646e;
      }
      &-link::after {
        content: '';
        width: 7px;
        height: 11px;
        margin-left: 4px;
        background: url('@/assets/images/arrow_right_white_in_white_theme.png') no-repeat;
        background-size: 100%;
      }
      &-link:hover {
        color: #212832;
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
      &-empty {
        opacity: 0;
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
      height: auto;
      max-height: 22px;
    }
  }
}
</style>
