<template>
  <div class="main-container">
    <!-- 1. 顶部导航栏 -->
    <header>
      <nav>
        <a
          v-for="item in navItems"
          :key="item.path"
          class="nav-items"
          @click="handleNavClick(item.path)"
        >
          {{ item.title }}
        </a>
      </nav>
    </header>

    <!-- 2. 中间标题区域 (占据剩余空间) -->
    <div class="hero-content">
      <!-- 动画顺序 1: 主标题 -->
      <h1 class="main-title animated-element delay-1">欢迎来到宁波</h1>
      <!-- 动画顺序 2: 副标题 -->
      <h3 class="sub-title animated-element delay-2">书藏古今，港通天下</h3>
    </div>

    <!-- 3. 底部走马灯区域 (动画顺序 3) -->
    <div class="carousel-section animated-element delay-3">
      <div class="carousel-wrapper">
        <el-carousel :interval="4000" type="card" height="360px">
          <el-carousel-item v-for="(img, index) in carouselImages" :key="index">
            <!-- 修改点：直接放图片，设置 object-fit: cover 保证填满 -->
            <img :src="img" class="carousel-img" alt="scenery" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, type RouteLocationAsPathGeneric, type RouteLocationAsRelativeGeneric } from 'vue-router';

const router = useRouter();

// 导航数据
const navItems = [
  { title: '主页', path: '/welcome' },
  { title: '美食', path: '/home/food' },
  { title: '景点', path: '/home/scenery' },
  { title: '文化', path: '/home/culture' },
  { title: '个人', path: '/user' }
];

// 点击跳转函数
const handleNavClick = (path: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric) => {
  router.push(path);
};

const carouselImages = [
  '/001.jpg',
  '/002.jpg',
  '/003.jpg',
  '/004.jpg',
  '/005.jpg'
];
</script>

<style scoped>
/* --- 关键帧动画定义 --- */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px); /* 初始向下偏移 */
    filter: blur(8px); /* 初始模糊 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* 动画通用类 */
.animated-element {
  opacity: 0; /* 初始隐藏，防止闪烁 */
  animation: fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 使用贝塞尔曲线让运动更顺滑 */
}

/* 延迟设置：依次出现 */
.delay-1 { animation-delay: 0.2s; } /* 主标题 */
.delay-2 { animation-delay: 0.5s; } /* 副标题 */
.delay-3 { animation-delay: 0.9s; } /* 走马灯 */

/* --- 整体布局容器 --- */
.main-container {
  /* 静态背景图设置 */
  background-image: url('/welcome1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column; /* 纵向布局 */
  overflow: hidden;
  font-family: "Poppins", sans-serif;
  color: #fff;
}

/* 顶部定位与居中 */
header {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500; /* 保证在最顶层 */
}

/* 导航条容器：磨砂玻璃、圆角 */
nav {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 5%; /* 左右 padding */

  background-color: rgba(255, 255, 255, 0.2); /* 半透明白底 */
  height: 60px; /* 原代码 height:30px 太小，容易切掉文字，建议稍微加大或由 padding 撑开 */

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  backdrop-filter: blur(5px); /* 磨砂效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  /* 入场动画 */
  animation: topIn 1.2s ease-out forwards;
  pointer-events: auto;
}

/* 导航项样式 */
.nav-items {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 2px;
  /* 原CSS是深色字 rgb(53,53,53)，如果背景图也是深色，建议改成白色或加粗 */
  color: rgb(240, 240, 240);

  width: 110px;
  text-align: center;
  padding: 15px 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  /* 核心交互属性 */
  cursor: pointer;
  pointer-events: auto; /* 强制允许鼠标事件 */
  transition: all 0.3s;
  text-decoration: none;

  /* 防止文字被选中，提升按钮质感 */
  user-select: none;
}


/* 鼠标悬停单个项 */
.nav-items:hover {
  background-color: #16423c;
  color: white;
}

/* 悬停容器时，非悬停项变透明/默认 */
nav:hover > .nav-items:not(:hover) {
  background-color: transparent;
  color: rgba(255, 255, 255, 0.6); /* 未选中项变暗淡 */
}

/* 导航栏入场动画 */
@keyframes topIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* --- 标题内容区 --- */
.hero-content {
  flex: 1; /* 自动占据中间所有剩余高度 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center;     /* 水平居中 */
  text-align: center;
  padding-bottom: 20px;
}

.sub-title {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 5px;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.main-title {
  font-size: 6rem; /* 大字体 */
  font-weight: 800;
  margin: 0;
  line-height: 1.1;
  text-transform: uppercase;
  text-shadow: 0 4px 15px rgba(0,0,0,0.6);
}

/* --- 走马灯区域 --- */
.carousel-section {
  height: 40vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent); /* 底部稍微加深背景 */
  padding-bottom: auto;
  box-sizing: border-box; /* 确保 padding 算在高度内 */
}

.carousel-wrapper {
  height: 100%;
  max-height: 700px;
  width: 90%;
  max-width: 1500px;
}

/* --- Element Plus Carousel 样式覆盖 --- */
:deep(.el-carousel__item) {
  border-radius: 16px;
}

/* 新增：图片样式 */
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 关键：保证图片填满卡片且不变形 */
  border-radius: 16px; /* 图片也加圆角 */
  display: block;
}

</style>
