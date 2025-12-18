<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header header-bg">
        <div class="header-left">
          <img src="https://www.cjlu.edu.cn/2025xwz/images24/logo.png" alt="logo" style="height:50px" />
          <span class="site-name">用户中心</span>
        </div>
        <div class="header-right">
          <el-button @click="ToHome" color="#626aef">back<el-icon><DArrowLeft /></el-icon></el-button>
        </div>
      </el-header>

      <el-container class="body-container">
        <el-aside width="400px" class ="Aside aside-bg">
          <dev class="left_panel">
            <div class="top_part">
              <el-avatar :size="250" :src="avatar_loc" />
              <el-button style="margin-top: 10px; min-width: 60px; font-weight: bold;" color="#626aef" icon="refresh" @click="drawer = true" plain>更换头像</el-button><br/>
              <el-drawer v-model="drawer" title="选择想要更换的头像" :with-header="false">
                <div class="avatar-container">
                  <div class="touxiang_change">
                    <el-button circle class="avatar-button" @click="ChangeAvatar('avatar_1')">
                      <el-avatar :size="150" shape="square" src="/public/avatar/avatar_1.png" />
                    </el-button>

                    <el-button circle class="avatar-button" @click="ChangeAvatar('avatar_2')">
                      <el-avatar :size="150" shape="square" src="/public/avatar/avatar_2.png" />
                    </el-button>

                    <!-- 可以继续添加更多按钮，会自动每排两个排列 -->
                    <el-button circle class="avatar-button">
                      <el-avatar :size="150" shape="square" src="/public/kal_H.png" />
                    </el-button>

                    <el-button circle class="avatar-button">
                      <el-avatar :size="150" shape="square" src="/public/kal_H.png" />
                    </el-button>
                  </div>
                </div>
              </el-drawer>
              <dev class="short_user_info">
                <h2 style="margin-top:5px;color: white;">用户名: {{ userStore.username }}</h2>
                <h3 style="margin-top:10px;color: white;">用户ID: {{ userStore.id }}</h3>
                <h3 style="margin-top:10px;color: white;">用户权限: {{ userStore.power }}</h3>
              </dev>
            </div>

            <div class="bottom_part">
              <el-button class="panel_button" @click="EditUserInfo" type="primary" icon="edit" plain>编辑个人资料</el-button><br/>
              <el-button class="panel_button" @click="changeuser" type="danger" icon="SwitchButton" plain>退出登录</el-button>
            </div>
          </dev>
        </el-aside>

        <el-main class="main main-bg">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script lang="ts">
export default {
  name: 'User_1',
};
</script>

<script setup lang="ts" setyped>

  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/user';
  import request from '@/utils/request'

  const userStore = useUserStore();

  const router = useRouter()

  const drawer = ref(false)

  const avatar_path = '/public/avatar/'
  let avatar_loc =avatar_path + userStore.avatar + '.png'


  function ChangeAvatar(newAvatar:string){
    avatar_loc =avatar_path + newAvatar +'.png'
    userStore.setAvatar(newAvatar)
    updatauser()
  }

  function EditUserInfo() {
    router.push('/user/user_edit')
  }

  function changeuser() {
    userStore.clearUser()
    router.push('/login')
  }

   async function updatauser(): Promise<void> {
    const res = await request.post('/user/updatauser', {
        username: userStore.username,
        email: userStore.email,
        userid: userStore.id,
        avatarid: userStore.avatar
    })
    if (res.data.code == 200) {
      // alert('修改成功！')
      drawer.value = false
      router.push('/user/user_info')
    } else {
      alert('修改失败！')
    }
    console.log(res.data)
  }

  // const username_password = computed(() => {
  //   return username.value + '_' + password
  // })

  function ToHome() {
    router.push('/home')
  }

</script>

<style scoped>
  .common-layout {
  min-height: 100vh;
  position: relative;
  overflow: auto;
  }

  .common-layout::before {
    content: "";
    position: fixed;         /* 固定视口，页面滚动时背景不动 */
    inset: 0;                /* 等价于 top:0;right:0;bottom:0;left:0; */
    z-index: -2;             /* 放到最底层 */
    background-image: url('/background.png'); /* <-- 把图片放到 public/images/bg.jpg */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transform: translateZ(0); /* 有时可改善 GPU 合成表现 */
  }

  .common-layout::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    background: linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.28)); /* 可调不透明度 */
    pointer-events: none;
  }

  .body-container {
    min-height: calc(90vh - 70px);
    max-width: calc(80vw);
    margin-top: 5vh;
    margin-left: 10vw;
  }

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

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .header-right {
    display: flex;
    align-items: center;
  }

  .header-bg {
    background: rgba(0, 0, 0, 0.700) ;
    border-right: 1px solid rgba(255, 255, 255, 0.18);
  }

  .site-name {
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
  }

  .Aside {
    padding: 16px;
    border-radius: 10px;
    color: var(--el-text-color-primary);
  }
  .aside-bg {
    background: rgba(0, 0, 0, 0.700) ;
    border-right: 1px solid rgba(255, 255, 255, 0.18);
  }

  .left_panel{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .top_part{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }

  .bottom_part{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }

  .panel_button{
    margin: auto;
    min-width: 200px;
    font-size: medium;
    font-weight: bold;
  }

  .main{
    border-radius: 10px;
  }

  .main-bg {
    background: rgba(0, 0, 0, 0.700) ;
    border-right: 1px solid rgba(255, 255, 255, 0.18);
  }

  .short_user_info{
    font-weight: bold;
    color: wh;
  }

  .touxiang_change{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
  }

  .avatar-container {
    padding: 20px;
  }

  .touxiang_change {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 每排两个 */
    gap: 80px; /* 按钮之间的间距 */
    max-width: 500px; /* 可选：限制最大宽度 */
    margin: auto;
  }

  .avatar-button {
    width: 100px; /* 固定按钮宽度 */
    height: 100px; /* 固定按钮高度 */
    padding: 0; /* 移除内边距 */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }

  /* 如果需要按钮有悬停效果 */
  .avatar-button:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
</style>
