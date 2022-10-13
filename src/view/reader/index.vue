<script lang="ts" setup></script>

<template>
  <div class="content">
    <div class="reader-bar">
      <a href="/" title="首页" class="reader-bar-home"></a>
      <span class="reader-bar-title">
        <span class="reader-bar-title-link"></span>/
        <span class="reader-bar-title-chapter"></span>
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  margin-left: auto;
  margin-right: auto;
  transition: background-color 0.2s ease-in-out;
  min-height: 100%;
  max-width: 1000px;
  background-color: #fff;
}
.reader-bar {
  position: fixed;
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 100%;
  height: 72px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  z-index: 80;
  border-bottom: 1px solid rgba(238, 240, 244, 0.1);
  background-color: #1f2022;
  transition: background-color 0.2s ease-in-out;
  border-bottom-color: rgba(33, 40, 50, 0.1);
  background-color: #fff;
  &-home {
    flex: none;
    width: 48px;
    height: 48px;
    margin-left: 16px;
    background-image: url('@/assets/images/logo-white.png');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 32px 32px;
    text-indent: -999em;
    opacity: 0.7;
  }
  &-title {
    flex: auto;
    margin-left: 36px;
    margin-right: 32px;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    overflow: hidden;
    height: 16px;
    display: -webkit-box;
    text-overflow: ellipsis;
  }
}
</style>
