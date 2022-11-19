import { createRouter, createWebHashHistory } from 'vue-router'

import Recommend from '@/views/Recommend'
import Singer from '@/views/Singer'
import Search from '@/views/Search'
import TopList from '@/views/TopList'
import SingerDetail from '@/views/SingerDetail.vue'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/Search',
    component: Search
  },
  {
    path: '/Top-List',
    component: TopList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
