<template>
  <div class="common-layout">
    <el-container class="layout-root">
      <el-aside width="200px"></el-aside>
      <el-main>
          <el-card>
            <template #header>
              <el-page-header :icon="ArrowLeft" @click="goBack">
                <template #content>
                  <span class="text-large font-600 mr-3"> 关于该项目 </span>
                </template>
              </el-page-header>
            </template>
            <div class = 'title'>
              项目作者：
            </div>
            <div class="body-font">
              董宇喆(Chiaki707) 23H034160318<br/>
              邮箱:1466491009@qq.com<br/>
              电话:13567894698<br/>
              毛凌云(Heiyaoai) 23H034160332<br/>
              邮箱:3439522822@qq.com<br/>
              电话:15990182807<br/>
            </div><br/>
            <div class = 'title'>
              项目说明：
            </div>
            <div class="body-font">
              本项目采用SSM框架作为后端,Vue3+Elements Plus制作前端<br/>
              <!-- 后端github仓库: https://github.com/ChiaKi707/hometown2<br/>
              前端github仓库: https://github.com/Eamonn-heiyaoai/hometown_vue_demo<br/> -->
              部分前端css代码使用了生成式AI进行辅助编程
            </div><br/>
            <div class = 'title'>
              特别鸣谢（排名不分先后）:
            </div>
            <div class="body-font">
              毛靖晨:为早期项目的构建提供了建议,分享了SSM框架与Vue3的学习路径。<br/>
              刘家壮:为头像模块提供了一份素材(avatar_3)。<br/>
              孙心坚:为头像模块提供了一份素材(avatar_4)。
            </div>

            <template #footer>{{temp}}</template>
          </el-card>
      </el-main>
      <el-aside width="200px"></el-aside>
    </el-container>
  </div>
</template>

<script lang="ts" setup name="AboutPage">
  import {useRouter} from 'vue-router'
  import { ArrowLeft } from '@element-plus/icons-vue'

  const router = useRouter()
  function goBack(){
    router.back()
  }

  const temp = "Ciallo～(∠・ω< )⌒★"
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
    background-image: url('/bizhihui_com_20231110230426169962866619052.png'); /* <-- 把图片放到 publicbg.jpg */
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

  .title{
    font-size: 25px;
    font-weight: 12px;
  }

  .body-font{
    font-size: 15px;
    font-weight: 10px;
    margin-left: 20px;
  }
</style>
