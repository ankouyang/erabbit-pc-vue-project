import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Login = () => import('@/views/login')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    children: []
  }
]

//  vue 2.0 new VueRouter({}) 创建路由实例
//  vue 3.0 createRouter({}) 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
