<template>
  <div>
    <h1>发布通知</h1>
    <el-form
      class="userForm"
      :model="dataForm"
      :rules="rules"
      ref="dataForm"
      label-width="80px"
      v-loading="loading"
    >
      <el-form-item label="通知标题" :label-width="formLabelWidth" prop="tname">
        <el-input v-model="dataForm.title" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        label="接收方"
        :label-width="formLabelWidth"
        prop="toUserIds"
      >
        <el-select
          v-model="dataForm.toUserIds"
          placeholder="请选择"
          :loading="selectLoading"
          :multiple="true"
          @focus="getUserOptions"
          collapse-tags
        >
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.uname"
            :value="item.uid"
          >
            <span style="float: left">{{ item.uname }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
              {{ item.uemail }}
            </span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        :label-width="formLabelWidth"
        label="通知内容"
        prop="content"
      >
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
          @click="submitForm('dataForm')"
        >
          确定发布
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入 Tinymce Editor
import TinymceEditor from '../utils/Tinymce-editor'

export default {
  name: 'Add',
  data() {
    return {
      // 绑定表单
      dataForm: {
        fromUser: this.$store.getters.getAdminInfo.uid,
        toUserIds: [],
        title: '',
        content: '',
      },
      userOptions: [],
      formLabelWidth: '120px',
      rules: {},
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
    // 获取用户
    getUserOptions() {
      this.selectLoading = true
      // 全查询
      this.axios
        .get('user/allUsers/1/-1', {
          headers: {
            token: this.$store.getters.getAdminInfo.token,
          },
        })
        .then(response => {
          var res = response.data
          if (res.status == 1) {
            this.userOptions = res.data
          } else {
            this.$message({
              type: 'warning',
              message: res.message,
            })
          }
          this.selectLoading = false
        })
    },
    // 提交表单
    submitForm(formName) {
      this.loading = true
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post('notice/publishNotice', this.dataForm, {
              headers: {
                token: this.$store.getters.getAdminInfo.token,
              },
            })
            .then(response => {
              var res = response.data
              var message = res.message
              var infoType = 'warning'
              this.loading = false

              if (res.status == 1) {
                this.$router.push('/admin')
                infoType = 'success'
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
  created(){
    
  },
  // vue-router 钩子函数,用来判断路由
  beforeRouteEnter(to, from, next) {
    // from源路径对象；to目标路径对象，进行带参跳转时候，参数存储在 to 中
    //console.log(from);
    if("/admin/topics" == from.fullPath){
      next(vm => {
        // 将参数填充到数组中，设置默认值
        vm.dataForm.toUserIds.push(to.params.uid);
      })
    }
    // 执行下一步
    next();
  },
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
