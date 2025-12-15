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
    <el-form
    :model="form"
    :rules="rules"
    ref="ruleFormRef"
    label-position="left"
    >
      <el-form-item label="Old Password" :label-width="formLabelWidth" prop="newpassword">
        <el-input v-model="form.oldpassword" show-password/>
      </el-form-item>
      <el-form-item label="New Password" :label-width="formLabelWidth" prop="newpassword">
        <el-input v-model="form.newpassword" show-password/>
      </el-form-item>
      <el-form-item label="Confirm Password" :label-width="formLabelWidth" prop="confirmpassword">
        <el-input v-model="form.confirmpassword" show-password/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
  import { ref,reactive} from 'vue';
  import { useUserStore } from '@/store/user';
  import { type FormInstance, type FormRules } from 'element-plus';
  import router from '@/router';
  import request from '@/utils/request';

  const dialogFormVisible = ref(false)
  const userStore = useUserStore();
  const formLabelWidth = '140px'

  interface Form {
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
  }
  const ruleFormRef = ref<FormInstance>()
  const form = reactive<Form>({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password'))
    } else {
      if (form.confirmpassword !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass')
      }
      callback()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password again'))
    } else if (value !== form.newpassword) {
      callback(new Error("Two inputs don't match!"))
    } else {
      callback()
    }
  }

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        console.log('submit!')
        const res = await request.post('/user/changePassword', {
          userId: userStore.id,
          oldPassword: form.oldpassword,
          newPassword: form.newpassword
        })

        if (res.data.code === 200) {
          alert('密码修改成功！请重新登录！')
          userStore.clearUser()
          router.push('/login')
        } else {
          alert(res.data.message)
        }

      } else {
        console.log('error submit!')
      }
    })
  }



  const rules = reactive<FormRules<typeof form>>({
    newpassword: [{ validator: validatePass, trigger: 'blur' }],
    confirmpassword: [{ validator: validatePass2, trigger: 'blur' }]
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
