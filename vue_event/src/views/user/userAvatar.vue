<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->

      <img v-if="!avatar" class="the_img" src="../../assets/images/avatar.jpg" alt="" />
    <img v-else class="the_img" :src="avatar" alt="">
      <!-- 按钮区域 -->
      <div class="btn-box">
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''" @click="uploadFn">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateUserAvatarAPI } from '@/api'
export default {
  name: 'UserAvatar',
  data() {
    return {
      avatar: ''
    }
  },
  methods: {
    // input[type=file]他是原生的标签，样式不好改，在这里用js代码方法实现
    chooseImg() {
      this.$refs.iptRef.click()
    },
    // 选择图片确定了
    onFileChange(e) { // e是原生的时间对象
      const files = e.target.files// 拿到用户选择的文件数组
      if (files.length === 0) {
        // 证明文件选择窗口打开但是没有选择文件点击确定关闭了选择弹窗
      } else {
        // 证明选择了文件默认只能够选择一个
      // 选择的图片要放到img标签上作为预览
        // 但是img标签的src值只能是图片的链接地址或者是base64字符串
        // 解决办法1：让文件指向内存的临时地址
        // 语法：URL.createObjectURL(文件)
        // this.avatar = URL.createObjectURL(files[0])
        // 解决方法2:转换成base64格式的就可以传送给后台
        const fr = new FileReader()
        fr.readAsDataURL(files[0]) // 传入文件对象开始读
        fr.onload = (e) => { // onload等待把文件读取成base64字符串后触发onlosd事件函数
          this.avatar = e.target.result// e.target.result就是读取完的结果
        }
      }
    },
    // 开始上传头像
    async uploadFn() {
      const { data: res } = await updateUserAvatarAPI(this.avatar)
      if (res.code !== 0) return this.$message.error(res.message)
      //   更新头像成功
      this.$message.success(res.message)
      this.$store.dispatch('getUserInfoActions')
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img{
    width: 350px;
    height: 350px;
}
</style>
