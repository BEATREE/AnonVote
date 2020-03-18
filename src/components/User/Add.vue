<template>
  <div>
    <h1>创建投票</h1>
    <el-steps
      :active="achieveStep"
      finish-status="success"
      simple
      style="margin: 5px 0 15px 0"
    >
      <el-step title="基础信息" icon="el-icon-s-order"></el-step>
      <el-step title="添加选项" icon="el-icon-s-ticket"></el-step>
      <el-step title="添加参与人并发布" icon="el-icon-upload"></el-step>
    </el-steps>
    <el-form
      class="userForm"
      :model="addTopicForm"
      :rules="rules"
      ref="addTopicForm"
      label-width="80px"
    >
      <div v-if="achieveStep == 0">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="tname"
        >
          <el-input v-model="addTopicForm.tname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="截止日期"
          :label-width="formLabelWidth"
          prop="tdeadline"
        >
          <el-date-picker
            v-model="addTopicForm.tdeadline"
            align="left"
            type="datetime"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        
        <el-form-item
          label="每人票数"
          :label-width="formLabelWidth"
          prop="tnum"
        >
          <el-input-number v-model="addTopicForm.tnum" :min="1" label="每人票数"></el-input-number>
        </el-form-item>
        
        <el-form-item
          :label-width="formLabelWidth"
          label="投票详情"
          prop="tdetail"
        >
          <tinymce-editor
            ref="editor"
            v-model="addTopicForm.tdetail"
            :disabled="tinymceDisabled"
            @onClick="onClick"
          ></tinymce-editor>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth">
          <el-button
            type="primary"
            icon="el-icon-caret-right"
            @click="nextStep('addTopicForm')"
          >
            下一步
          </el-button>
        </el-form-item>
      </div>
      <div v-if="achieveStep == 1">
        <el-collapse v-model="collapseActiveNames">
          <el-form-item
            v-for="(option, index) in addTopicForm.options"
            :key="option.key"
            :label="'选项 ' + index"
            :prop="'options.' + index + '.oname'"
            :rules="{
              required: true,
              message: '选项/选手信息不能为空',
              trigger: 'blur',
            }"
          >
            <el-collapse-item :name="option.key">
              <template slot="title">
                <span style="color: red;">打开/折叠选项</span>
                <i class="header-icon el-icon-s-operation"></i>
              </template>
              <span style="float: left;">选项图像：</span>
              <el-upload
                class="avatar-uploader"
                name="userheadpic"
                action="http://localhost:8088/api/upload/img"
                :with-credentials="true"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="option.opic" :src="option.opic" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <br />
              <span>选项名称：</span>
              <el-input
                v-model="option.oname"
                placeholder="选项/选手名称"
              ></el-input>
              <br />
              <span>选项简介：</span>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="option.odesc"
              ></el-input>
              <el-button
                type="danger"
                @click.prevent="removeItem(option, 'options')"
                v-if="index != 0"
                style="margin: 8px 0 0 8px;"
              >
                删除此选项
              </el-button>
            </el-collapse-item>
          </el-form-item>
          <el-form-item>
            <el-button
              type="warning"
              icon="el-icon-caret-left"
              @click="lastStep"
            >
              上一步
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-caret-right"
              @click="nextStep('addTopicForm')"
            >
              下一步
            </el-button>
            <el-button
              type="success"
              icon="el-icon-circle-plus"
              @click="addItem('options')"
            >
              新增选项
            </el-button>
          </el-form-item>
        </el-collapse>
      </div>
      <div v-if="achieveStep == 2">
        <!-- <el-collapse v-model="collapseActiveNames2"> -->
        <div
          v-for="(participant, index) in addTopicForm.participants"
          :key="participant.index"
        >
          <el-form-item
            :label="'参与者 ' + index"
            :prop="'participants.' + index + '.uname'"
            :rules="{
              required: true,
              message: '参与人信息不能为空',
              trigger: 'blur',
            }"
          >
            <!-- <el-collapse-item :name="index">
              <template slot="title">
                <span style="color: red;">打开/折叠选项</span>
                <i class="header-icon el-icon-s-operation"></i>
              </template> -->

            <span>参与者姓名：</span>
            <el-input
              v-model="participant.uname"
              placeholder="请输入参与人名称"
            ></el-input>

            <!-- </el-collapse-item> -->
          </el-form-item>
          <el-form-item
            :prop="'participants.' + index + '.uemail'"
            :rules="[
              {
                required: true,
                message: '参与人邮件不能为空',
                trigger: 'blur',
              },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <span>参与者邮箱：</span>
            <el-input
              v-model="participant.uemail"
              placeholder="请输入参与人邮箱"
            ></el-input>

            <el-button
              type="danger"
              @click.prevent="removeItem(participant, 'participants')"
              v-if="index != 0"
            >
              删除
            </el-button>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="warning" icon="el-icon-caret-left" @click="lastStep">
            上一步
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-caret-right"
            @click="submitForm('addTopicForm')"
          >
            确定发布
          </el-button>
          <el-button
            type="success"
            icon="el-icon-circle-plus"
            @click="addItem('participants')"
          >
            增加参与者
          </el-button>
        </el-form-item>
        <!-- </el-collapse> -->
      </div>
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
      addTopicForm: {
        uid: '',
        tname: '',
        tdeadline: '',
        tdetail: '',
        tnum: 1,
        options: [
          {
            key: 0,
            oname: '',
            opic: '',
            odesc: '选手描述信息',
          },
        ],
        participants: [
          {
            key: 0,
            uname: '',
            uemail: '',
          },
        ],
      },
      imageUrl: [],
      formLabelWidth: '120px',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      }, // 设置时间
      rules: {
        tname: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        tnum: [{ required: true, message: '请设置票数', trigger: 'blur' }],
        tdeadline: [
          { required: true, message: '请设定活动截止时间', trigger: 'blur' },
        ],
        tdetail: [
          { required: true, message: '请填写活动详情', trigger: 'blur' },
        ],
      },
      //   tinymce
      tinymceDisabled: false,
      achieveStep: 0,
      collapseActiveNames: [0],
      // collapseActiveNames2: [0],
      showDialog: false,
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
    // 当点击上一步
    lastStep() {
      this.achieveStep -= 1
    },
    // 当点击下一步
    nextStep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.achieveStep += 1
        }
      })
    },
    removeItem(item, name) {
      if (name == 'options') {
        var index = this.addTopicForm.options.indexOf(item)
        if (index !== -1) {
          this.addTopicForm.options.splice(index, 1)
        }
      } else if (name == 'participants') {
        var index = this.addTopicForm.participants.indexOf(item)
        if (index !== -1) {
          this.addTopicForm.participants.splice(index, 1)
        }
      }
    },
    addItem(name) {
      if (name == 'options') {
        var tempKey = Date.now()
        this.addTopicForm.options.push({
          oname: '',
          opic: '',
          odesc: '',
          key: tempKey,
        })
        this.collapseActiveNames = [tempKey]
      } else if (name == 'participants') {
        this.addTopicForm.participants.push({
          uname: '',
          uemail: '',
          key: Date.now(),
        })
      }
    },
    // 图象上传
    handleAvatarSuccess(res, file, fileList) {
      console.log(res)
      console.log(file);
      console.log(fileList.length);
      this.imageUrl[fileList.length - 1] = URL.createObjectURL(file.raw)
      this.addTopicForm.options[fileList.length - 1].opic = res.storepath
      // console.log(res)
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 或 GIF 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 提交表单
    submitForm(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          // this.$router.push("/main");
          this.axios.post('topic/publishTopic', this.addTopicForm, {
            headers:{
              token: this.$store.getters.getUserInfo.token,
            }
          }).then(response => {
            var res = response.data;
            var message = res.message;
            var infoType = "warning";
            if(res.status == 1){
              this.$router.push("/user")
              infoType = "success"
            }

            this.$message({
              type: infoType,
              message: message
            })
          })
        } else {
          this.showDialog = true;
        }
      })
    },
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
