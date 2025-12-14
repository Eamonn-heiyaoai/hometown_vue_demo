<template>
  <el-card class="card-container">
    <div class="card-content">
      <!-- 左侧图片 -->
      <!-- <img
        class="card-image"
        :src="image"
        alt="image"
      /> -->

      <el-image class="card-image" :src="image" />

      <!-- 右侧文字 -->
      <div class="text-container">
        <h3 class="card-title">{{ title }}</h3>

        <div class="description-container">
          <p class="card-description">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts" name="InfoCard">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
})
</script>


<style scoped>
.card-container {
  max-width: 90%;
  margin: auto;
  background-color: black;
  border-radius: 12px;
}

.card-content {
  display: flex;
  gap: 20px;
  height: 180px;
  width: 70vw;
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
