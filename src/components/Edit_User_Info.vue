<template>
  <div class="form">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="new name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="new email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          保存
        </el-button>
        <el-button type="danger" @click="resetForm(ruleFormRef)">取消</el-button>
    </el-form>
  </div>


</template>

<script setup lang="ts">

  import type { FormInstance, FormRules } from 'element-plus'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/user';
  import request from '@/utils/request'

  const userStore = useUserStore();


  interface RuleForm {
  name: string
  email: string
}

  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    name: userStore.username,
    email: userStore.email,
  })

  const router = useRouter()

  const rules = reactive<FormRules<RuleForm>>({
    name: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 3, max: 16, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    email: [
      { required: false, message: 'Please input Activity email', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
    ],
  })

  async function updatauser(): Promise<void> {
    const res = await request.post('/user/updatauser', {
        username: ruleForm.name,
        email: ruleForm.email,
        userid: userStore.id,
        avatarid: userStore.avatar
    })
    if (res.data.code == 200) {
      alert('修改成功！')
      userStore.setUsername(ruleForm.name)
      userStore.setEmail(ruleForm.email)
      router.push('/user/user_info')

      localStorage.setItem('user', JSON.stringify({
        id: userStore.id,
        username: userStore.username,
        email: userStore.email,
        power: userStore.power,
        avatar: userStore.avatar,
        isLogin: true
      }))
    } else {
      alert('修改失败！')
    }
    console.log(res.data)
  }

  const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updatauser()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  router.push('/user/user_info')
}
</script>

<style scoped>
  .form {
    max-width: 600px;
    margin: 20px 0;
  }
</style>
