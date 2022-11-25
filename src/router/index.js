import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/Recommend.vue')
const Singer = () => import('@/views/Singer')
const Search = () => import('@/views/Search')
const TopList = () => import('@/views/TopList')
const SingerDetail = () => import('@/views/SingerDetail.vue')
const Album = () => import('@/views/Album.vue')
const TopDetail = () => import('@/views/TopDetail.vue')
const UserCenter = () => import('@/views/UserCenter.vue')

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
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
    path: '/Top-List',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  },
  {
    path: '/Search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/User',
    components: {
      user: UserCenter
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
