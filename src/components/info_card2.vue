<template>
  <el-card class="card-container">
    <div class="card-content">
      <!-- 左侧图片区域 -->
      <img
        class="card-image"
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      />

      <!-- 右侧文字区域 -->
      <div class="text-container">
        <!-- 标题部分 - 顶至顶部 -->
        <h3 class="card-title">这是一个信息卡片组件2</h3>

        <!-- 简介部分 - 占据剩余空间 -->
        <div class="description-container">
          <p class="card-description">
            这里是卡片的详细介绍内容，可以包含多行文字。这段文字会自动在标题下方显示，并且与标题保持左对齐。如果简介内容较长，会自动在容器内滚动显示。
          </p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts" name="InfoCard">
</script>

<style scoped>
.card-container {
  max-width: 90%;
  margin: auto;
  background-color: black;
}

.card-content {
  display: flex;
  gap: 20px;
  height: 180px;
}

.card-image {
  width: 240px;
  height: 100%;
  flex-shrink: 0;
  border-radius: 10px;
}

.text-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-title {
  color: white;
  margin: 0 0 12px 0;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
}

.description-container {
  flex: 1;
  overflow: hidden;
}

.card-description {
  color: #ccc;
  margin: 0;
  text-align: left;
  line-height: 1.5;
}
</style>
