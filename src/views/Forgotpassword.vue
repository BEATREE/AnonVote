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
            <el-step title="重置密码" description="请设置您的新密码"></el-step>
            <el-step
              title="完成"
              description="已成功找回密码，请前往登录"
            ></el-step>
          </el-steps>
          <el-card class="stepContainer">
            <div class="step1" v-if="currentStep == 0">
              <el-form
                label-position="right"
                label-width="80px"
                :model="emailInfo"
              >
                <el-form-item label="邮箱地址">
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-email"
                    v-model="emailInfo.address"></el-input>
                </el-form-item>
                <el-form-item label="验证码" style="">
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="emailInfo.validcode"
                    style="width: 60%;"
                  ></el-input>
                  <ValidCode ></ValidCode>
                </el-form-item>
              </el-form>
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
      emailInfo:{
        address: '',
        validcode: ''
      },
      currentStep: 0, // 当前进行到了哪一步
    }
  },
  created() {},
  methods: {
    checkUrl() {
      // 查看Url格式，是否带有参数
      var token = this.$route.query.token
      // 1 如果带有token -> 后台核验
      if (token != null) {
        this.axios.post('url', { token: token }).then(response => {
          // 获取服务器回应
          let res = response.data
          if (res.state == '1') {
            // 1.1 token验证合格
          } else {
            // 1.2 token验证不合格
          }
        })
      } else {
      }

      // 2 如果没有带有token -> 从第一步骤开始
    },
  },
  components: {
    ValidCode,
  },
}
</script>

<style lang="scss" scoped>
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
