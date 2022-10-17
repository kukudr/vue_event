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
            <!-- 这是一个作用域插槽 -->
          <template v-slot="scope">
             <el-button type="primary" size="mini" @click="updateCateFn(scope.row)">修改</el-button>
             <el-button type="danger" size="mini">删除</el-button>
         </template>
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
// 同一个按钮想要状态区分
// 定义标记变量isEdit还要定义本次想要编辑的数据唯一的id值，editId
// 再点击修改的时候idEdit为true,editId保存要修改的数据的id
// 再点击新增的时候idEdit为flase,editId置空
// 再点击保存按钮的时候就可以用isEdit变量做区分了

import { getArticleListAPI, saveArticleAPI, updateArtCateAPI } from '@/api'
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
      isEdit: false,
      editId: '',
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
      // 状态区分
      this.isEdit = false
      this.editId = ''
      this.dialogVisible = true
    },
    // 对话框取消按钮点击事件
    cancleFn() {
      this.dialogVisible = false
    },
    // 对话框确定按钮点击事件，对话框消失调用保存文章分类接口
    confirmFn() {
      this.$refs.addRef.validate(async vaild => {
        if (vaild) {
          if (this.isEdit) {
            // 修改的事件
            this.addForm.id = this.editId
            const { data: res } = await updateArtCateAPI(this.addForm)
            if (res.code !== 0) {
              return this.$message.error(res.message)
            }
            this.$message.success(res.message)
            this.dialogVisible = false
          } else {
            // 通过校验
            const { data: res } = await saveArticleAPI(this.addForm)
            //   提示弹窗
            if (res.code !== 0) {
              return this.$message.error(res.message)
            }
            this.$message.success(res.message)
            this.dialogVisible = false
          }
          //   console.log(res)
          // 添加成功后再次请求最新的数据让表格更新
          //   特别注意生命周期的函数不会挂载到this上
          this.getArticleFn()
        } else {
          // 校验失败
          return false
        }
      })
    },
    // 对话框关闭时的回调
    dialogCloseFn() {
      this.$refs.addRef.resetFields()
    },
    // 修改分类按钮的点击事件(先做数据的回显)
    updateCateFn(obj) {
      // obj的值是一个文章的对象
      console.log(obj)
      //   实现状态区分
      this.isEdit = true
      this.editId = obj.id
      //   实现数据回显
      // 先让弹窗出现
      this.dialogVisible = true
      // 然后让相应的值再输入框出现
      this.addForm.cate_name = obj.cate_name
      this.addForm.cate_alias = obj.cate_alias
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
