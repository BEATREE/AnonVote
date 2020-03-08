<template>
  <div class="outestDiv">
    <div class="loginContainer">
      <div class="logo">
        <a href="/#/">
          <img
            src="@/assets/img/cover.png"
            style="width: 23%;margin-left: 37.5%;margin-bottom: -3vh;"
          />
        </a>
        <div class="findPasswd">
          <h2>找回密码</h2>
          <!-- 步骤条 -->
          <el-steps
            :active="currentStep"
            finish-status="success"
            process-status="finish"
            align-center
          >
            <el-step
              title="邮箱信息"
              description="请输入您的登录邮箱"
            ></el-step>
            <el-step
              title="接收邮件"
              description="发送带有验证链接的邮件至您邮箱"
            ></el-step>
            <el-step title="重置密码" description="请设置您的新密码"></el-step>
            <el-step
              title="完成"
              description="已成功找回密码，请前往登录"
            ></el-step>
          </el-steps>
          <el-card class="stepContainer">
            <div class="step1" v-if="currentStep == 0">
              <el-form
                ref="emailForm"
                label-position="right"
                label-width="100px"
                :model="emailInfo"
                :rules="rules1"
              >
                <el-form-item label="邮箱地址:" prop="uemail">
                  <el-input
                    placeholder="请输入您的注册邮箱"
                    prefix-icon="el-icon-message"
                    v-model="emailInfo.uemail"
                  ></el-input>
                </el-form-item>
                <el-form-item label="验证码:" style="" prop="validcode">
                  <el-input
                    placeholder="请输入右侧验证码"
                    prefix-icon="el-icon-thumb"
                    v-model="emailInfo.validcode"
                    style="width: 65%;"
                  ></el-input>
                  <ValidCode
                    ref="ValidCode"
                    @update:value="getValidCode"
                  ></ValidCode>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" v-on:click="onStep1('emailForm')">
                    确定
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div
              class="step2"
              v-if="currentStep == 1"
              style="text-align: center;"
            >
              <img
                src="../assets/img/email.jpg"
                style="width:220px; margin: 8px auto;"
              />
              密码重置链接已发送到您的邮箱，请前往进行重置操作，链接将于30分钟后失效。
            </div>
            <div class="step3" v-if="currentStep == 2">
              <el-form
                ref="resetForm"
                label-position="right"
                label-width="120px"
                :model="resetForm"
                :rules="rules2"
              >
                <el-form-item prop="uid" hidden>
                  <el-input
                    placeholder="请输入您的注册邮箱"
                    prefix-icon="el-icon-message"
                    v-model="resetForm.uid"
                  ></el-input>
                </el-form-item>
                <el-form-item label="新密码:" style="" prop="password">
                  <el-input
                    type="password"
                    placeholder="请输入新密码"
                    prefix-icon="el-icon-thumb"
                    v-model="resetForm.password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="重新输入密码:" style="" prop="repassword">
                  <el-input
                    type="password"
                    placeholder="请再次输入密码"
                    prefix-icon="el-icon-thumb"
                    v-model="resetForm.repassword"
                  ></el-input>
                  <div v-if="pwdsRsame" class="el-form-item__error">
                    两次密码不一致
                  </div>
                </el-form-item>
                <el-form-item label="验证码:" style="" prop="validcode">
                  <el-input
                    placeholder="请输入右侧验证码"
                    prefix-icon="el-icon-thumb"
                    v-model="resetForm.validcode"
                    style="width: 65%;"
                  ></el-input>
                  <ValidCode
                    ref="ValidCode"
                    @update:value="getValidCode"
                  ></ValidCode>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    v-on:click="onStep3('resetForm')"
                    :disabled="pwdsRsame"
                  >
                    登录
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="step3" v-if="currentStep == 4">
              <h2>恭喜您，密码重设成功！</h2>

              <el-button type="primary" @click="goto('login')">前往登录</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidCode from '@/components/utils/ValidCode.vue'

export default {
  name: 'Login',
  data() {
    return {
      // 步骤一表单数据
      emailInfo: {
        uemail: '',
        validcode: '',
      },
      // 步骤三表单数据
      resetForm: {
        uid: '',
        password: '',
        repassword: '',
        validcode: '',
      },
      validcode: '', //成的验证码生
      currentStep: 0, // 当前进行到了哪一步

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules1: {
        uemail: [
          { required: true, message: '邮箱不可为空', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur'],
          },
        ],
        validcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
      rules2: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        repassword: [
          { required: true, message: '请重新输入密码', trigger: 'blur' },
        ],
        validcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    // 核查链接
    this.checkUrl()
  },
  methods: {
    // 查看Url格式，是否带有参数
    checkUrl() {
      var token = this.$route.query.token
      // 1 如果带有token -> 后台核验
      if (token != null) {
        // this.axios.post('url', { token: token }).then(response => {
        //   // 获取服务器回应
        //   let res = response.data
        //   if (res.state == '1') {
        //     // 1.1 token验证合格
        //   } else {
        //     // 1.2 token验证不合格
        //   }
        // })

        // 静态开发，而后需用axios进行动态验证
        this.resetForm.uid = 0 // 之后从api取得
        this.currentStep = 2 // 设定当前步骤
      } else {
      }

      // 2 如果没有带有token -> 从第一步骤开始
    },
    // 验证码判断
    checkValidCode(validcode) {
      return this.validcode.toLowerCase() == validcode.toLowerCase()
    },
    // 从子组件获取验证码
    getValidCode(val) {
      this.validcode = val
    },
    // 步骤一处理函数
    onStep1(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        // 如果校验成功
        if (valid) {
          // 验证码判断
          if (this.checkValidCode(this.emailInfo.validcode)) {
            // 发送api请求
            // this.axios.push("url", this.emailInfo).then( response => {

            // })
            console.log('发送api请求')
            // if(请求成功) 进入第二步骤
            this.currentStep = 1
            // else 如果未成功
            // 判断返回码
            // 0. 未注册 1. 网络问题
            this.$message({
              message: '您输入的邮箱不存在，请核查后再次输入',
              type: 'warning',
            })
          } else {
            this.$message({
              message: '验证码有误，请重新输入',
              type: 'error',
            })
            this.$refs['ValidCode'].refreshCode()
          }
        }
      })
    },
    // 步骤三处理函数
    onStep3(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        // 如果校验成功
        if (valid) {
          // 验证码判断
          if (this.checkValidCode(this.resetForm.validcode)) {
            // 发送api请求
            // this.axios.push("url", this.emailInfo).then( response => {

            // })
            console.log('发送设置密码api请求，数据为', this.resetForm)
            // if(请求成功) 进入第四步骤，且更新第四步骤为已完成
            this.currentStep = 4
            // else 如果未成功
            // 判断返回码
            //
            this.$message({
              message: '网络似乎存在错误，请稍后再试',
              type: 'warning',
            })
          } else {
            this.$message({
              message: '验证码有误，请重新输入',
              type: 'error',
            })
            this.$refs['ValidCode'].refreshCode()
          }
        }
      })
    },
    // 页面跳转
    goto(path){
      this.$router.push(path)
    }
  },
  computed: {
    // 验证两次password是否一样
    pwdsRsame() {
      return (
        this.resetForm.password != this.resetForm.repassword &&
        this.resetForm.repassword != ''
      )
    },
  },
  components: {
    ValidCode,
  },
}
</script>

<style lang="scss" scoped>
// 验证码样式
.ValidCode {
  display: inline-flex;
  margin-left: 12px;
}

div.findPasswd {
  width: 60%;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
  .stepContainer {
    width: 75%;
    margin: 0 auto;
    margin-top: 2vh;
    div[class^='step'] {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
