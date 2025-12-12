import {createRouter,createWebHistory} from 'vue-router'

import User from '@/pages/User.vue'
import About from '@/pages/About.vue'
import Home from '@/pages/Home_page.vue'
import info_card1 from '@/components/info_card1.vue'
import info_card2 from '@/components/info_card2.vue'
import info_card3 from '@/components/info_card3.vue'

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
          path:'/',
          redirect:'/home'
        }
    ]
})

export default router
