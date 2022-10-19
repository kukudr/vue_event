/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
// myAxios请求的时候地址baseURL+url然后去请求后台
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({ baseURL })

// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发起时统一携带Authorization和token值
    // 判断:登陆页面和注册页面vuex里面没有token而且登录接口和注册接口也不需要携带token(但是其他页面需要)
    // 在请求前会触发一次
    if (store.state.token) {
        config.headers.Authorization = store.state.token
    }
    return config
}, function (error) {
    // 请求发起前的代码如果有异常报错,则会直接进入这里
    return Promise.reject(error)
})

// 定义响应拦截器
// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 响应状态为2XX的时候触发成功的回调,形参中的response是 成功的结果
    return response
}, function (error) {
    if (error.response.status === 401) {
        // 本次响应式token过期
        // 清除vuex中的一切然后切换回登陆页面{被动退出登陆状态}
        store.commit('updateToken', '')
        store.commit('updateUserInfo', {})
        router.push('/login')
        Message.error('身份过期,请重新登录')
    }
    // 响应状态不是2XX的时候触发失败的回调,形参中的error是 成功的结果
    return Promise.reject(error)
})
// 导出axios自定义函数
export default myAxios
