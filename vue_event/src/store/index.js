/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersisteState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '', // 保存token字符串
        userInfo: {}// 保存用户的信息{id,username,nickname,email,user_pic}
    },
    getters: {
        // username(state) {
        //     return state.userInfo.username
        // }
        // 这是简写方式
        username: state => state.userInfo.username, // 用户的名字
        nickname: state => state.userInfo.nickname, // 用户的昵称
        user_pic: state => state.userInfo.user_pic// 用户的头像

    },
    mutations: {
        updateToken(state, val) {
            state.token = val
        },
        // 保存用户的信息
        updateUserInfo(state, val) {
            state.userInfo = val
        }
    },
    actions: {
        // 请求用户信息
        async getUserInfoActions(store) {
            const res = await getUserInfoAPI()
            store.commit('updateUserInfo', res.data.data)
        }
    },
    modules: {
    },
    plugins: [
        createPersisteState() // 注入持久化插件
    ]
})
