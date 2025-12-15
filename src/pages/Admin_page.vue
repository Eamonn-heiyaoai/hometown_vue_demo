<template>
  <div class="common-layout">
    <el-container class="layout-root">
      <el-header class="header header-bg">
        <div class="header-left">
          <img src="https://www.cjlu.edu.cn/2025xwz/images24/logo.png" alt="logo" style="height:50px" />
          <span class="site-name">家乡介绍后台管理</span>
        </div>
        <!--
        <div class="header-right">
          <el-button @click="ToUser" size="large" circle>
            <el-avatar src="/public/kal_H.png" />
          </el-button>
        </div>
        -->
      </el-header>

      <el-container class="body-container">
        <el-aside width="200px" class="Aside aside-bg">
          <el-menu
            @select="handleSelect"
            :router="true">
            <el-menu-item index="/admin/food">美食管理</el-menu-item>
            <el-menu-item index="/admin/culture">文化管理</el-menu-item>
            <el-menu-item index="/admin/scenery">景点管理</el-menu-item>
            <el-menu-item index="/admin/users">用户管理</el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main class="main-area glass-card">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </el-main>

          <el-footer class="footer-area footer-bg">
            &copy; 2025 家乡介绍系统 All rights reserved. desgined by Heiyaoai & ChiaKi707
          </el-footer>
        </el-container>
      </el-container>

    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (index: string) => {
  activeIndex.value = index
  console.log('选中了:', index)
}
</script>

<style>
.header {
  position: relative;
  background-image: linear-gradient(to right, #1a5e38, #2a8c54, #3aad6e, #56c886, #74e49f);
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

el-main {
  background-color: #ffffff;
  padding: 20px;
}
</style>