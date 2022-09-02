<script lang="ts" setup>
import NavBar from './NavBar.vue'
import Container from './Container.vue'
</script>

<template>
  <el-container>
    <el-header class="nav-bar">
      <NavBar></NavBar>
    </el-header>
    <el-main>
      <Suspense>
        <Container></Container>
      </Suspense>
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
