/* eslint-disable indent */
// 这里封装的是具体的请求接口的方法
// 每个方法只负责请求一个url地址
import request from '@/utils/request'
// 添加请求拦截器不需要再专门写请求头
// import store from '@/store'
// 导出接口的方法在逻辑页面引用
/**
 *
 * @param {*} obj 用户登录信息
 * @returns Promise对象
 */
export const registerAPI = (obj) => {
    return request({
        url: '/api/reg',
        method: 'POST',
        // axios传参会有params和data两种
        // data的对象参数名和值，axios源码会把参数和值，拼接到请求体内部（body参数）
        data: obj

    })
}
/**
 *登录接口
 * @param {*} username:用户名
 * @param {*} password：密码
 * @returns Promise对象
 */
export const loginAPI = (obj1) => {
    return request({
        url: '/api/login',
        method: 'POST',
        data: obj1
    })
}
/**
 *
 * @returns 获取用户信息
 */
export const getUserInfoAPI = () => {
    return request({
        url: '/my/userinfo'
        // 请求方式默认是GET方式
        // 传参给后台：params(查询字符串query),data(请求体body),headers(请求头)
        // headers: {
        //     Authorization: store.state.token
        // }
    })
}
/**
 * 再次测试提交史帅杰测试数据
 *获取侧边栏数据
 * @returns 返回的是Promise对象
 */
export const getMenuListAPI = () => {
    return request({
        url: '/my/menus'
        // 拿到token的值
        // headers: {
        //     Authorization: store.state.token
        // }
    })
}
/**
 * 更新基本资料
 * @param {*} param0
 * @returns
 */
export const updateUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
    return request({
        url: '/my/userinfo',
        method: 'PUT',
        data: {
            id,
            username,
            nickname,
            email,
            user_pic
        }
    })
}
/**
 * 更新用户头像
 * @param {*} avatar 头像图片base64字符串
 * @returns Promise对象
 */
export const updateUserAvatarAPI = (avatar) => {
    return request({
        url: '/my/update/avatar',
        method: 'PATCH',
        data: {
            avatar// 头像base64格式字符串
        }
    })
}
/**
 * 更新用户密码
 * @param {*} param0 {old_pwd 旧密码，new_pwd新密码，rep_pwd确认密码}
 * @returns Problems对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
    return request({
        url: '/my/updatepwd',
        method: 'PATCH',
        data: {
            old_pwd,
            new_pwd,
            re_pwd
        }
    })
}
/**
 * 获取文章列表的分类
 * @returns Promise对象
 */
export const getArticleListAPI = () => {
    return request({
        url: '/my/cate/list'
    })
}
/**
 * 保存文章分类
 * @param {*} param0 {cate_name分类名称,catealias分类别名}
 * @returns Promise对象
 */
export const saveArticleAPI = ({ cate_name, cate_alias }) => {
    return request({
        url: '/my/cate/add',
        method: 'POST',
        data: {
            cate_name,
            cate_alias
        }
    })
}
/**
 * 修改文章
 * @param {*} param0 { id：文章id, cate_name:文章名称, cate_alias：文章别名 }
 * @returns Promise对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
    return request({
        url: '/my/cate/info',
        method: 'PUT',
        data: {
            id,
            cate_name,
            cate_alias
        }
    })
}
/**
 * 删除-文章分类
 * @param {*} id 文章的id
 * @returns Promies
 */
export const delArtCateAPI = (id) => {
    return request({
        url: '/my/cate/del',
        method: 'DELETE',
        params: {
            id
        }
    })
}
/**
 * 发布文章
 * @param {*} fd FormData表单数据对象
 * @returns Promise对象
 */
export const uploadArticleAPI = (fd) => {
    return request({
        url: '/my/article/add',
        method: 'POST',
        data: fd
    })
}

/**
 * 获取文章列表
 * @param {*} param0 { pagenum,:文章页码 pagesize：当前页需要的数据条数, cate_id：文章的id, state:文章的状态 }
 * @returns Promise对象
 */
export const getArtListAPI = ({ pagenum, pagesize, cate_id, state }) => {
    return request({
        url: '/my/article/list',
        params: {
            pagenum,
            pagesize,
            cate_id,
            state
        }
    })
}
export const getArtDetailAPI = (id) => {
    return request({
        url: '/my/article/info',
        params: { id }
    })
}
/**
 * 删除文章
 * @param {*} id 删除文章的id
 * @returns Promise对象
 */
export const delArticleAPI = (id) => {
    return request({
        url: '/my/article/info',
        method: 'DELETE',
        params: {
            id
        }
    })
}
