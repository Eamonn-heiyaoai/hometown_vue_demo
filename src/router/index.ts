import {createRouter,createWebHistory} from 'vue-router'

import User from '@/pages/User.vue'
import About from '@/pages/About_page.vue'
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
import scenery_admin from '@/components/scenery_admin.vue'
import user_admin from '@/components/user_admin.vue'
import detail_page from '@/components/Detail_page.vue'
import Welcome from '@/pages/Welcome_page.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
          path:'/user',
          component:User,
          meta:{
            title: '个人中心'
          },
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
          component:About,
          meta:{
            title: '关于我们'
          },
        },
        {
          path:'/welcome',
          component:Welcome,
          meta:{
            title: '欢迎页'
          },
        },
        {
          path:'/home',
          component:Home,
          meta:{
            title: '家乡介绍-主页'
          },
          children:[
            {
              path:'food',
              component:food_panel,
              meta:{
                title: '主页-美食'
              }
            },
            {
              path:'culture',
              component:culture_panel,
              meta:{
                title: '主页-文化'
              }
            },
            {
              path:'scenery',
              component:scenery_panel,
              meta:{
                title: '主页-景点'
              }
            },
            {
              path: 'detail/:type/:id',
              component:detail_page,
              meta:{
                title: '详情'
              }
            }
          ]
        },
        {
          path:'/admin',
          component:Admin,
          children:[
            {
              path:'food',
              component:food_admin,
              meta:{
                title: '后台管理-美食'
              }
            },
            {
              path:'culture',
              component:culture_admin,
              meta:{
                title: '后台管理-文化'
              }
            },
            {
              path:'scenery',
              component:scenery_admin,
              meta:{
                title: '后台管理-景点'
              }
            },
            {
              path:'users',
              component:user_admin,
              meta:{
                title: '后台管理-用户'
              }
            }

          ]
        },
        {
          path:'/login',
          component:Login,
          meta:{
            title: '登录页'
          }
        },
        {
          path:'/',
          redirect:'/login'
        }
    ]

})

export default router
