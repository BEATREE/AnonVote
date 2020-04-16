// 认证码核查页面

<template>
  <div class="jumpPanel">
    <h1>请在下方输入您的认证码：</h1>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-s-flag"
      v-model="verificationCode"
      :autofocus="true"
      style="font-size: 15px;"
    ></el-input>
    <el-button
      :disabled="checkable"
      class="checkbutton"
      type="primary"
      icon="el-icon-s-check"
      @click="jumpToTopic"
    >
      点击核验
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Jump',
  data() {
    return {
      verificationCode: '',
      topicId: '', // 投票主体id，用于跳转
    }
  },
  methods: {
    runAsync() {
      var p = new Promise((resolve, reject) => {})
      return p
    },
    jumpToTopic() {
      // 请求远程api查询数据，
      var loadingInstance = this.$loading({
        fullscreen: true,
        text: '正在核验中',
      })

      this.axios
        .get('tlink/checkCode/' + this.verificationCode)
        .then(response => {
          //加载完成后关闭加载框
          loadingInstance.close()
          var res = response.data
          var topicData = res.data;
          // 请求成功
          if (res.status == 1) {
            // 包含有 topic， options
            // 未参与投票
            var topicData = res.data
            this.$store.commit("setVerifiedStatus", true);
            this.$store.commit("setEffectiveStatus", true);
            // 成功则跳转
            this.$router.push({
              name: 'Vote',
              params:{ // 在本页面获取对应投票信息
                  topicData: topicData,
                  canvote: true   // 是否可以投票
              }
            })
          } else if (res.status == 2) {
            // 已参与过投票，只能查看，无法操作
            var topicData = res.data
            this.$store.commit("setVerifiedStatus", true);
            this.$store.commit("setEffectiveStatus", false);
            // 成功则跳转
            this.$router.push({
              name: 'Vote',
              params:{ // 在本页面获取对应投票信息
                  topicData: topicData,
                  canvote: false,   // 是否可以投票
              }
            })

          } else if(res.status == 3){
            // 投票已截止
            this.$message({
              type: 'warning',
              message: res.message
            });
            
            this.$router.push({
              name: 'Result',
              params: {
                tid: res.data.tid,
              },
            })
          }else {
            this.$message({
              type: 'error',
              message: res.message,
            })
          }
        })
        .catch(() => {
          var that = this
          // 请求失败
          loadingInstance.close()
          that.$message({
            message: '当前网络状况似乎存在问题',
            type: 'warning',
          })
        })
    },
  },
  computed: {
    checkable() {
      //监听是否输入了认证码
      return this.verificationCode == ''
    },
  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 970px) {
  div.jumpPanel {
    width: 80% !important;
  }
}
div.jumpPanel {
  display: flex;
  flex-direction: column;
  width: 38%;
  height: 72vh;
  margin: 0 auto;
}
.checkbutton {
  margin-top: 15px;
  float: right;
}
</style>
