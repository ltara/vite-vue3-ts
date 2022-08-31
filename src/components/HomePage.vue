<script lang="ts" setup>
import HomeNavBar from './HomeNavBar.vue'
import HomeContainer from './HomeContainer.vue'
</script>

<template>
  <el-container>
    <el-header class="nav-bar">
      <HomeNavBar></HomeNavBar>
    </el-header>
    <el-main>
      <HomeContainer></HomeContainer>
    </el-main>
  </el-container>
</template>

<style lang="less" scoped>
.el-header {
  background-color: #f6f7f9;
  width: 100%;
  height: 386px;
}
</style>
