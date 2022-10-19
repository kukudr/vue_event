<template>
  <!-- 一级路由对象组件挂载点-->
  <router-view></router-view>
</template>

<script>
// 命名导出需要加上大括号
// import { registerAPI } from '@/api'
// import { getUserInfoAPI } from '@/api'
export default {
  name: 'App'
  // eslint-disable-next-line space-before-function-paren
  //   async created() {
  //     const res = await registerAPI()
  //   },
  //   created() {
  //     getUserInfoAPI().then(res => {
  //     })
  //   }
}
</script>

<style scoped></style>
