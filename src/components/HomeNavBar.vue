<script lang="ts" setup>
const url = '/logo.png'
</script>

<template>
  <div class="nav-bar-header">
    <div class="nav-bar-border">
      <div class="nav-bar-inner">
        <span class="nav-bar-placeholder-regular"></span>
        <el-link type="default">上传</el-link>
      </div>
    </div>
  </div>
  <div class="nav-bar-body">
    <div class="nav-bar-logo">
      <el-image class="nav-bar-logo-img" :src="url" fit="fill"></el-image>
      <div class="nav-bar-logo-text">ePub阅读器</div>
    </div>
    <div class="nav-bar-input">
      <span class="nav-bar-input-left"></span>
      <input type="text" placeholder="搜索" class="nav-bar-input-text" />
      <span class="nav-bar-input-right"></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav-bar {
  .el-link {
    font-size: 16px;
  }
  &-border {
    width: 100%;
    height: 72px;
  }
  &-inner {
    max-width: 1332px;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &-placeholder-regular {
    flex: 1;
  }
  &-body {
    height: 136px;
    margin-top: 78px;
  }
  &-logo {
    text-align: center;
    display: flex;
    justify-content: center;
    &-img {
      width: 36px;
      height: 36px;
    }
    &-text {
      font-size: 25px;
      line-height: 36px;
    }
  }
  &-input {
    position: relative;
    width: 80%;
    max-width: 840px;
    margin: 48px auto 0;
    &-left {
      content: '';
      position: absolute;
      top: 16px;
      left: 20px;
      width: 20px;
      height: 20px;
      background: url('../assets/images/search-magnifier-white.png');
    }
    &-text {
      width: 100%;
      padding: 0 52px;
      box-sizing: border-box;
      height: 52px;
      border: 0;
      border-radius: 26px;
      font-size: 16px;
      color: #212832;
      background: #fff;
      box-shadow: 0 4px 20px rgb(0 25 104 / 5%);
      &:focus-visible {
        outline: 0;
      }
    }
    &-right {
      content: '';
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;
      background: url('../assets/images/search-return-white.png');
    }
  }
}
</style>
