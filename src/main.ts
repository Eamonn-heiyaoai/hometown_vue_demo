import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import './tailwindcss.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/user'

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(pinia)

const userStore = useUserStore()
userStore.restoreUser()

app.mount('#app')
