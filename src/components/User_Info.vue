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
    <el-button icon="Warning" color="#626aef" @click="dialogFormVisible = true" size="large">重置账户密码</el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="Old Password" :label-width="formLabelWidth">
        <el-input v-model="form.oldpassword" autocomplete="off" />
      </el-form-item>
      <el-form-item label="New Password" :label-width="formLabelWidth">
        <el-input v-model="form.newpassword" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Confirm Password" :label-width="formLabelWidth">
        <el-input v-model="form.confirmpassword" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
  import { ref,reactive } from 'vue';
  import { useUserStore } from '@/store/user';

  const dialogFormVisible = ref(false)
  const userStore = useUserStore();
  const formLabelWidth = '140px'

  const form = reactive({
    oldpassword: '',
    newpassword: '',
    confirmpassword: ''
  })


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
