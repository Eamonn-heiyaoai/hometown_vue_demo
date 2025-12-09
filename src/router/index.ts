import {createRouter,createWebHistory} from 'vue-router'

import User from '@/pages/User.vue'
import About from '@/pages/About.vue'
import Home from '@/pages/Home.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
          path:'/user',
          component:User
        },
        {
          path:'/about',
          component:About
        },
        {
          path:'/',
          component:Home
        }
    ]
})

export default router
