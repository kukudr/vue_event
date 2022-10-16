<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input type="password" placeholder="再次确认密码" v-model="form.repassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="registerFn">注册</el-button>
          <el-link type="info" @click="$router.push('/login')">去登陆</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api'
export default {
  name: 'my-register',
  data() {
    // 必须在data函数内部定义这个箭头函数才可以确保this.form可用
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        // 如果验证失败，则调用回调函数是指定一个错误对象
        callback(new Error('两次输入的密码不一致'))
      } else {
        // 如果验证成功，则直接调用callback回调函数即可
        callback()
      }
    }
    return {
      // 表单的数据对象
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      //   表单的规则对象
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerFn() {
      // 兜底校验
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 通过校验,拿到绑定的数据
          //   console.log(typeof this.form.username)
          //   1.调用注册接口
          const { data: res } = await registerAPI(this.form)
          //   console.log(res)
          if (res.code !== 0) {
            // 2.注册失败提示用户
            // console.log(res)
            return this.$message.error(res.message)
          }
          // 3.注册成功，提示用户
          this.$message.success(res.message)
          this.$router.push('/login')
        } else {
          // 组织默认提交行为（表单下边红色提示会自动出现）
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
