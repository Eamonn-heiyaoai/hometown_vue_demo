import {createRouter,createWebHistory} from 'vue-router'

import User from '@/pages/User.vue'
import About from '@/pages/About.vue'
import Home from '@/pages/Home_page.vue'
import food_panel from '@/components/food_panel.vue'
import culture_panel from '@/components/culture_panel.vue'
import scenery_panel from '@/components/scenery_panel.vue'
import Edit_User_Info from '@/components/Edit_User_Info.vue'
import User_Info from '@/components/User_Info.vue'
import Login from '@/pages/Login.vue'
import Admin from '@/pages/Admin_page.vue'
import food_admin from '@/components/food_admin.vue'
import culture_admin from '@/components/culture_admin.vue'

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
              path:'food',
              component:food_panel
            },
            {
              path:'culture',
              component:culture_panel
            },
            {
              path:'scenery',
              component:scenery_panel
            }
          ]
        },
        {
          path:'/admin',
          component:Admin,
          children:[
            {
              path:'food',
              component:food_admin
            },
            {
              path:'culture',
              component:culture_admin
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
