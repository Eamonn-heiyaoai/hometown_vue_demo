<template>
  <div class="common-layout">
    <el-container class="layout-root">
      <el-header class="header header-bg">
        <div class="header-left">
          <img src="https://www.cjlu.edu.cn/2025xwz/images24/logo.png" alt="logo" style="height:50px" />
          <span class="site-name">家乡介绍</span>
        </div>
        <div class="header-right">
          <el-button @click="ToUser" size="large" circle><el-avatar src="/public/kal_H.png" /></el-button>
        </div>
      </el-header>

      <el-container class="body-container">
        <el-aside width="200px" class="Aside aside-bg">
          <el-menu
            :default-active="activeMenu"
            @select="handleSelect"
            router="false"
            class="custom-menu"
          >
            <el-menu-item index="/home/info_card1">信息卡片1</el-menu-item>
            <el-menu-item index="/home/info_card2">信息卡片2</el-menu-item>
            <el-menu-item index="/home/info_card3">信息卡片3</el-menu-item>
            <!-- <el-menu-item index="other">其它组件</el-menu-item> -->
          </el-menu>
        </el-aside>
        <el-container>
          <el-main class="main-area glass-card">
            <!-- 动态渲染：currentComponent 为组件对象或组件名 -->
            <router-view/>
          </el-main>

          <el-footer class="footer-area footer-bg">翻页
            <el-pagination background layout="prev, pager, next" :total="10" />
          </el-footer>
        </el-container>
      </el-container>

    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (index: string) => {
  activeIndex.value = index
  console.log('选中了:', index)
}

const router = useRouter()
function ToUser() {
  router.push('/user/user_info')
}

const activeMenu = ref('')

</script>

<style scoped>
/* ---------- 背景层（放在最底层） ---------- */
/* 说明：将背景图放在 ::before 中可以保持 DOM 层级清晰，且更容易添加 overlay */
.common-layout {
  min-height: 100vh;
  position: relative;
  overflow: auto;
}

/* 背景图与暗色叠加（put your image under public/ e.g. public/images/bg.jpg） */
.common-layout::before {
  content: "";
  position: fixed;         /* 固定视口，页面滚动时背景不动 */
  inset: 0;                /* 等价于 top:0;right:0;bottom:0;left:0; */
  z-index: -2;             /* 放到最底层 */
  background-image: url('/20250506081829174649070940211.jpg'); /* <-- 把图片放到 publicbg.jpg */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: translateZ(0); /* 有时可改善 GPU 合成表现 */
}

/* 深色叠加，增强前景可读性 */
.common-layout::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  background: linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.28)); /* 可调不透明度 */
  pointer-events: none;
}

/* 确保根容器填满视口高度（避免元素漂浮） */
.layout-root {
  min-height: 100vh;
  background: transparent; /* 背景由 ::before 提供 */
}

/* ---------- 毛玻璃统一样式（在需要的组件上加类 .glass-effect） ---------- */
/* 可调整 blur / 透明度 / 边框颜色 */
.glass-effect {
  background: rgba(255, 255, 255, 0.08); /* 半透明背景，配合 backdrop-filter */
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12); /* 细边框，增强分层感 */
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.28);
  border-radius: 10px;
}

/* 针对 Element Plus 的内部默认背景覆盖，确保透明/半透明生效 */
.el-main {
  background: transparent !important;
}

/* header 特定样式：保持高度/布局 */
.header {
  position: relative;
  height: 70px;
  background-color: #303030;
  color: #40a0ffad;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.28);
}

/* aside 高度让其铺满可用内容区（排除 header 高度） */
.body-container {
  min-height: calc(100vh - 70px); /* header 高度 70px */
}

/* 如果希望侧栏也有圆角，仅在视觉上微调： */
.Aside {
  padding: 16px;
  color: var(--el-text-color-primary);
}

.header-bg {
  background: rgba(0, 0, 0, 0.70) ;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

.aside-bg {
  background: rgba(0, 0, 0, 0.700) ;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
}

.footer-bg {
  background: rgba(0, 0, 0, 0.700) ;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
}


/* main 区域内边距，给内容留白 */
.main-area {
  padding: 20px;
  min-height: calc(100vh - 70px - 64px); /* header + footer 的高度估计（可按实际调整） */
}

/* footer 样式 */
.footer-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  color: aliceblue;
}

/* site 名称与 header 左侧排版 */
.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.header-right {
  display: flex;
  align-items: center;
}
.site-name {
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
}

/* 可选：若你在内容中使用 Card 风格区域，可用 .glass-card */
.glass-card {
  padding: 16px;
  border-radius: 12px;
  background: rgba(255,255,255,0.06);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
}

.custom-menu {
  /* 修改菜单背景色 */
  --el-menu-bg-color: #222a33;
  /* 修改菜单文字颜色 */
  --el-menu-text-color: #ecf0f1;
  /* 修改菜单悬停背景色 */
  --el-menu-hover-bg-color: #34495e;
  /* 修改菜单项高度 */
  --el-menu-item-height: 56px;

  /* 选中状态的背景颜色 */
  --el-menu-active-color: #049bff;
  /* 选中状态的背景色 */
  --el-menu-active-bg-color: rgba(30, 53, 69, 0.2);

  border-right: none;
}

.custom-menu .el-menu-item {
  /* 普通状态背景色 */
  background-color: var(--el-menu-bg-color);
  /* 普通状态文字颜色 */
  color: var(--el-menu-text-color);

  /* 悬停效果 */
  transition: all 0.3s ease;
}

.custom-menu .el-menu-item:hover {
  background-color: var(--el-menu-hover-bg-color);
}

.custom-menu .el-menu-item.is-active {
  /* 选中状态文字颜色 */
  color: var(--el-menu-active-color) !important;
  /* 选中状态背景色 */
  background-color: var(--el-menu-active-bg-color) !important;

  /* 添加左边框指示器 */
  border-left: 4px solid var(--el-menu-active-color);
  /* 字体加粗 */
  font-weight: 600;
}

/* 可视化与无障碍提示（高对比模式下可变更透明度） */
@media (prefers-contrast: more) {
  .glass-effect { background: rgba(255,255,255,0.18); }
}

/* 仅面向电脑端——可以放宽响应式考虑（你已说明只考虑电脑端） */
/* 但仍保留基本小屏断点以防用户缩小窗口 */
@media (max-width: 900px) {
  .header { padding: 0 12px; }
  .site-name { font-size: 18px; }
  .Aside { display: none; } /* 小窗口隐藏侧栏（可按需修改） */
}
</style>
