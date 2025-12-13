<template>
  <div class="top_group">
    <el-descriptions
      title="用户信息"
      direction="horizontal"
      :column="1"
      :size="'large'"
      border
      >
        <el-descriptions-item label="Username">{{userStore.username}}</el-descriptions-item>
        <el-descriptions-item label="Email">{{userStore.email}}</el-descriptions-item>
        <el-descriptions-item label="User_id">{{userStore.id}}</el-descriptions-item>
        <el-descriptions-item label="Power">{{userStore.power}}</el-descriptions-item>
    </el-descriptions>
  </div>

  <div class ="button_group">
    <el-button icon="Warning" color="#626aef" @click="EditUserInfo" size="large">重置账户密码</el-button>
  </div>
</template>

<script setup lang="ts">

  import { useUserStore } from '@/store/user';

  const userStore = useUserStore();


  function EditUserInfo() {
    // Here you can add logic to reset the password
  }
</script>

<style scoped>
  .top_group {
    text-align: center;
    margin-bottom: 20px;
  }

  .button_group {
    margin-top: 40px;
    text-align: left;
  }
</style>
