import {createRouter,createWebHistory} from 'vue-router'

import User from '@/pages/User.vue'
import About from '@/pages/About.vue'
import Home from '@/pages/Home_page.vue'
import info_card1 from '@/components/info_card1.vue'
import info_card2 from '@/components/info_card2.vue'
import info_card3 from '@/components/info_card3.vue'
import Edit_User_Info from '@/components/Edit_User_Info.vue'
import User_Info from '@/components/User_Info.vue'
import Login from '@/pages/Login.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
          path:'/user',
          component:User,
          children:[
            {
              path:'user_edit',
              component:Edit_User_Info
            },
            {
              path:'user_info',
              component:User_Info
            }
          ]
        },
        {
          path:'/about',
          component:About
        },
        {
          path:'/home',
          component:Home,
          children:[
            {
              path:'info_card1',
              component:info_card1
            },
            {
              path:'info_card2',
              component:info_card2
            },
            {
              path:'info_card3',
              component:info_card3
            }
          ]
        },
        {
          path:'/login',
          component:Login
        },
        {
          path:'/',
          redirect:'/login'
        }
    ]
})

export default router
