<template>
  <div>
    <!-- 内容区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
                <el-option v-for="obj in cateList" :key="obj.id" :label="obj.cate_name" :value="obj.cate_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="showPubDialogFn">发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->

      <!-- 分页区域 -->
    </el-card>
    <!-- 发表文章的 Dialog 对话框 -->
    <el-dialog title="发表文章"
    :visible.sync="pubDialogVisible"
    fullscreen
    :before-close="handleClose">
    <!-- 发布文章的对话框 -->
    <el-form :model="pubForm" :rules="pubFormRules" ref="pubFormRef" label-width="100px">
        <el-form-item label="文章标题" prop="title">
         <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
         <el-select v-model="pubForm.cate_id" placeholder="请选择分类" style="width: 100%;">
            <el-option v-for="obj in cateList" :key="obj.id" :label="obj.cate_name" :value="obj.id"></el-option>
        </el-select>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <el-form-item label="文章内容" prop="content">
            <quill-editor v-model="pubForm.content" @change="contentChangeFn"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
         <!-- 用来显示封面的图片 -->
        <img src="../../assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef" />
        <br />
        <!-- 文件选择框，默认被隐藏 -->
        <input type="file" style="display: none;" accept="image/*" ref="iptFileRef" @change="changeCoverFn"/>
        <!-- 选择封面的按钮 -->
        <el-button type="text" @click="selCoverFn">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="pubArticleFn('已发布')">发布</el-button>
            <el-button type="info" @click="pubArticleFn('草稿')">存为草稿</el-button>
        </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api'
// JS内部引入图片需要用import导入，webpack会把它当作模块数据，转换成打包后的图片路径还是base64字符串
import imgObj from '@/assets/images/cover.jpg'
export default {
  // 在Vue变量内部引入图片路径会被当做字符串处理
  name: 'ArtList',
  data() {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      pubDialogVisible: false, // 控制文章对话框发表的
      pubForm: { // 表单的数据对象
        title: '', // 文章的标题
        cate_id: '', // 文章的id
        content: '', // 文章的内容
        cover_img: '', // 封面图片保存的是个文件
        state: ''// 发布状态
      },
      pubFormRules: { // 表单的验证规则对象
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [{ required: true, message: '请选择文章标题', trigger: 'change' }],
        // 需要自己绑定失去焦点事件
        content: [{ required: true, message: '请输入文章的内容', trigger: 'blur' }],
        cover_img: [{ required: true, message: '请选择文章封面', trigger: 'blur' }]

      },
      // 保存文章分类列表的数据
      cateList: []

    }
  },
  created() {
    this.getCateListFn()
  },
  methods: {
    // 发布文章对话框关闭前的回调
    async handleClose(done) { // done作用就是调用就会关闭对话框
      // 询问用户是否确认关闭对话框
      const confirmResult = await this.$confirm('此操作将导致文章信息丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === 'cancel') return
      // 确认关闭
      done()
    },
    showPubDialogFn() {
      this.pubDialogVisible = true
    },
    // 获取所有的分类
    async  getCateListFn() {
      const { data: res } = await getArticleListAPI()
      this.cateList = res.data
    },
    // 选择封面点击事件==》打开文件选择框
    selCoverFn() {
      this.$refs.iptFileRef.click()
    },
    changeCoverFn(e) {
      // e.target.files可以拿到选择的文件数组
      const files = e.target.files
      if (files.length === 0) {
        // 用户没有选择图片，就需要把cover_img属性置空
        this.pubForm.cover_img = null
        this.$refs.imgRef.setAttribute('src', imgObj)
      } else {
        // 用户选择图片 会把图片直接保存在表单对象的属性上
        this.pubForm.cover_img = files[0]
        // 把图片显示到img内部
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
    },
    // 点击发布或存为草稿的点击事件准备调用后端接口
    pubArticleFn(str) {
      this.pubForm.state = str
      //   必须进行兜底校验
      this.$refs.pubFormRef.validate(valid => {
        if (valid) {
          // 通过
          console.log(this.pubForm)
        } else {
          return false
        }
      })
    },
    // 富文本编辑器内容改变触发此事件的方法
    contentChangeFn() {
      // 对部分表单字段进行校验的方法
      this.$refs.pubFormRef.validateField('content')
    }
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
// 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
::v-deep .ql-editor {
  min-height: 300px;
}
// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
</style>
