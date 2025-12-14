<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container class="common-layout">
    <el-main>
      <el-row justify="center">
        <el-col :xs="24" :sm="12" :md="8">
          <el-card class="auth-card">
            <!-- 登录/注册切换 -->
            <div class="tab-switch">
              <el-button-group>
                <el-button type='primary' @click="switchTab('login')">
                  登录
                </el-button>
                <el-button type='primary' @click="switchTab('register')">
                  注册
                </el-button>
              </el-button-group>
            </div>

            <!-- 表单区域 -->
            <el-form
              ref="formRef"
              :model="formData"
              @submit.prevent="handleSubmit"
            >
              <!-- 用户名/邮箱 -->
              <el-form-item prop="account">
                <el-input
                  v-model="formData.account"
                  :placeholder="isLogin ? '用户名' : '请输入用户名'"
                  prefix-icon="User"
                />
              </el-form-item>

              <!-- 密码 -->
              <el-form-item prop="password">
                <el-input
                  v-model="formData.password"
                  type="password"
                  :placeholder="`请输入密码${isLogin ? '' : '(6-20位)'}`"
                  show-password
                  prefix-icon="Lock"
                />
              </el-form-item>

              <!-- 注册时确认密码 -->
              <el-form-item v-if="!isLogin" prop="confirmPassword">
                <el-input
                  v-model="formData.confirmPassword"
                  type="password"
                  placeholder="请再次输入密码"
                  show-password
                  prefix-icon="Lock"
                />
              </el-form-item>

              <!-- 提交按钮 -->
              <el-form-item>
                <el-button
                  type="primary"
                  :loading="loading"
                  @click="handleSubmit"
                  class="submit-btn"
                >
                  {{ isLogin ? '登录' : '注册' }}
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="Login">
  import { ref } from 'vue'
  import request from '@/utils/request'
  import {useRouter} from 'vue-router'
  import { useUserStore } from '@/store/user';

  // const login = async () => {
  //   const res = await request.post('/login', {
  //       username: form.username,
  //       password: form.password
  //     })

  //     console.log(res.data)
  //   }

  const router = useRouter()
  const userStore = useUserStore();
  const formData = ref({
    account: '',
    password: '',
    confirmPassword: ''
  })

  async function login(): Promise<void> {
    const res = await request.post('/login', {
        username: formData.value.account,
        password: formData.value.password
    })
    if (res.data.code == 200) {
      alert('登录成功！')
      userStore.setUser(res.data.data.username, res.data.data.email, res.data.data.userid, res.data.data.power, res.data.data.password)
      router.push('/home')
    } else {
      alert('登录失败，请检查用户名和密码。')
    }
    console.log(res.data)
  }

  async function register(): Promise<void> {
    const res = await request.post('/register', {
        username: formData.value.account,
        password: formData.value.password
    })
    if (res.data.code == 200) {
      alert('注册成功， 请登录！')
      router.push('/')
    } else {
      alert('注册失败')
    }
    console.log(res.data)
  }

  const isLogin = ref(true)

  function switchTab(tab: string) {
    isLogin.value = tab === 'login'
  }

  const loading = ref(false)

  function handleSubmit() {
    loading.value = true
    setTimeout(async () => {
      if (isLogin.value) {
        // 登录逻辑
        await login()
      } else {
        // 注册逻辑
        if (formData.value.password !== formData.value.confirmPassword) {
          alert('两次输入的密码不一致')
          loading.value = false
          return
        }
        await register()
        isLogin.value = true
      }
      loading.value = false
    }, 1000)
  }

</script>

<style scoped>

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
  background-image: url('/m3.avif'); /* <-- 把图片放到 publicbg.jpg */
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

  /* 容器样式 */
.auth-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-card {
  margin-top: 50px;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

/* 表单样式 */
.tab-switch {
  text-align: center;
  margin-bottom: 30px;
}

.submit-btn {
  width: 100%;
  height: 45px;
  font-size: 16px;
}

.forgot-password {
  float: right;
}

.oauth-login {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
