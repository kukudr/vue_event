/* eslint-disable indent */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/views/layout/index.vue'),
        redirect: '/home',
        children: [
            { path: 'home', component: () => import('@/views/home/index.vue') },
            { path: '/user-info', component: () => import('@/views/user/userInfo.vue') },
            { path: '/user-avatar', component: () => import('@/views/user/userAvatar.vue') }
        ]
    },
    { path: '/reg', component: () => import('@/views/register/index.vue') },
    { path: '/login', component: () => import('@/views/login/index.vue') }
]

const router = new VueRouter({ routes })
// 创建白名单,在白名单内的地址
const whiteList = ['/login', 'reg']
//  全局前置路由守卫
// 浏览器第一次打开项目登录页面会触发一次全局前置路由守卫
// 有token就是登陆了,没有就是没有登录
router.beforeEach((to, from, next) => {
    // 本地存在token值才会请求用户信息
    const token = store.state.token
    if (token) {
        // 登陆了
        if (!store.state.userInfo.username) {
            // 现在有token的值才回去请求用户信息
            store.dispatch('getUserInfoActions')
        }
        next()
    } else {
        // 未登录可以访问的路由地址则放行(路由前置守卫不会再触发,而是匹配路由表让组件挂载)
        if (whiteList.includes(to.path)) {
            next()
        } else {
            // 没有登录就强制切换到登录的页面
            next('/login')
        }
    }
})
export default router
