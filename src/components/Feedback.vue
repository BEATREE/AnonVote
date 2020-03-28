<template>
  <div style="width: 70%;margin: 0 auto;">
    <h1 style="text-align: center;">建议反馈</h1>
    <el-form
      class="userForm"
      :model="dataForm"
      :rules="rules"
      ref="dataForm"
      label-width="80px"
      v-loading="loading"
    >
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="dataForm.title" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item :label-width="formLabelWidth" label="内容" prop="content">
        <tinymce-editor
          ref="editor"
          v-model="dataForm.content"
          :disabled="tinymceDisabled"
          @onClick="onClick"
        ></tinymce-editor>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-caret-right"
          style="margin: 0 auto;"
          @click="submitForm('dataForm')"
        >
          确定提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入 Tinymce Editor
import TinymceEditor from './utils/Tinymce-editor'

export default {
  name: 'Add',
  data() {
    return {
      // 绑定表单
      dataForm: {
        title: '',
        content: '',
      },
      userOptions: [],
      formLabelWidth: '120px',
      rules: {
        title: [{ required: true, message: '标题不可为空', trigger: 'blur' }],
      },
      //   tinymce
      tinymceDisabled: false,
      collapseActiveNames: [0],
      // collapseActiveNames2: [0],
      showDialog: false,
      loading: false,
      selectLoading: false, // 下拉选项加载状态
    }
  },
  methods: {
    //  Tinymce 相关方法
    // 鼠标单击的事件
    onClick(e, editor) {
      //   console.log('Element clicked')
      //   console.log(e)
      //   console.log(editor)
    },
    // 清空内容
    clear() {
      this.$refs.editor.clear()
    },

    // 提交表单
    submitForm(formName) {
      this.loading = true
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post('notice/feedback', this.dataForm)
            .then(response => {
              var res = response.data
              var message = res.message
              var infoType = 'warning'
              this.loading = false

              if (res.status == 1) {
                infoType = 'success'
                this.dataForm = {}
              }
              this.$message({
                type: infoType,
                message: message,
              })
            })
            .catch(error => {
              this.loading = false
              this.$message({
                type: 'error',
                message: error,
              })
            })
        } else {
          this.showDialog = true
        }
      })
    },
  },
  created() {},
  components: {
    TinymceEditor,
  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 780px) {
  .el-input {
    width: 220px;
  }
}
.el-input,
.el-textarea {
  width: 50%;
  margin-bottom: 5px;
}
</style>
