<template>
  <div>
    <!-- 预览文章分类 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini"  @click="addCateShowDialogFn">添加分类</el-button>
      </div>
      <!-- //分类数据表格 -->
      <el-table :data="cateList" style="width: 100%" border stripe>
        <!-- type是table-colunm的内置属性使用index就是第一个单元格使用索引值 -->
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加文章分类列表对话框 -->
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  @close="dialogCloseFn">
  <!-- 添加的表单 -->
  <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
  <el-form-item label="分类名称" prop="cate_name">
    <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
  </el-form-item>
  <el-form-item label="分类别名" prop="cate_alias">
    <el-input v-model="addForm.cate_alias" minlength="1" maxlength="15"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancleFn">取 消</el-button>
    <el-button type="primary" @click="confirmFn">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api'
export default {
  name: 'ArtCate',
  data() {
    return {
      dialogVisible: false, // 添加文章分类列表对话框
      cateList: [], // 文章分类数组
      addForm: { // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getArticleFn()
  },
  methods: {
    async getArticleFn() {
      const res = await getArticleListAPI()
      this.cateList = res.data.data
    },
    // 添加分类按钮点击事件-》让对话框出现
    addCateShowDialogFn() {
      this.dialogVisible = true
    },
    // 对话框取消按钮点击事件
    cancleFn() {
      this.dialogVisible = false
    },
    // 对话框确定按钮点击事件，对话框消失调用保存文章分类接口
    confirmFn() {},
    dialogCloseFn() {
      this.$refs.addRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
