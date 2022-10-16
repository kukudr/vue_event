<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img class="the_img" src="../../assets/images/avatar.jpg" alt="" />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
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
        console.log(files[0])
      }
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
