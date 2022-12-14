import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.less'
import '@/elementUI/index.js'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入时间格式化
import dayjs from 'dayjs'
Vue.prototype.$formatDate = (dateObj) => { return dayjs(dateObj).format('YY-MM-DD HH:mm:ss') }
Vue.use(VueQuillEditor /* { default global options } */)

Vue.config.productionTip = false

new Vue({ router, store, render: h => h(App) }).$mount('#app')
