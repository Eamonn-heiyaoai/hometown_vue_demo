<template>
  <div class="common-layout">
    <el-container class="layout-root">
      <el-header class="header">
        <div class="header-top">
          <div class="header-left">
            <img
              src="https://www.cjlu.edu.cn/2025xwz/images24/logo.png"
              alt="logo"
              class="logo-img"
            />
            <span>基于Java的Web开发期末大作业</span>
          </div>
        </div>

        <div class="header-bottom">
          <div class="header-title">
            家乡介绍后台管理系统
          </div>
        </div>
      </el-header>

      <el-container class="body-container">
        <el-aside width="200px" class="Aside">
          <el-menu
            @select="handleSelect"
            :router="true">
            <el-menu-item index="/admin/food">美食管理</el-menu-item>
            <el-menu-item index="/admin/culture">文化管理</el-menu-item>
            <el-menu-item index="/admin/scenery">景点管理</el-menu-item>
            <el-menu-item index="/admin/users">用户管理</el-menu-item>
          </el-menu>

          <br/>
          <el-button class="backbutton"
          icon="HomeFilled"
          type="primary"
          @click="backtohome">
            返回主页
          </el-button>
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

          <el-footer class="footer-area">
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

const router = useRouter()

const activeIndex = ref('1')
const handleSelect = (index: string) => {
  activeIndex.value = index
  console.log('选中了:', index)
}

function backtohome(){
  router.push('/home')
}
</script>

<style scoped>
/* 让根容器撑满整个页面高度 */
.common-layout,
.layout-root {
  height: 100vh;          /* 或者 min-height: 100vh; */
}

.header {
  position: relative;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 30px; /* 上下/左右内边距 */
  box-sizing: border-box;

  background-image: linear-gradient(
    to right,
    #1a5e38,
    #2a8c54,
    #3aad6e,
    #56c886,
    #74e49f
  );
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  color: #fff;
}

/* 上半部分：logo + 右侧文字，做一行左右排布 */
.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  height: 56px;
  width: auto;
}

/* 下半部分：主标题 + 副标题，视觉上居中 */
.header-bottom {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header-title {
  margin-top: 4px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: none;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.Aside {
  border-right: 3px solid #535353; /* 颜色按你整体风格调整 */
  box-sizing: border-box;
}

el-main {
  background-color: #ffffff;
  padding: 20px;
}

/* 底部：始终贴在右侧容器底部 */
.footer-area {
  flex-shrink: 0;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  font-size: 12px;
}

  .backbutton{
    display: flex;
    margin: auto;
  }

</style>
