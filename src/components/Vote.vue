// 投票页面 // 1. 拦截验证 // 1.1 需输入认证码 // 1.2 后台查询返回结果 // 1.3
进入或退出 // 1.3.1 认证码错误 -> 提示信息 "认证码错误，请勿恶意尝试"，退出页面
// 1.3.2 认证码正确，投票主题错误 -> 提示信息 "您的投票主题链接错误，请点击
??进行投票" 跳转投票 // 1.3.3 认证码正确，已投过票 -> 提示信息
"该认证码已失效，仅可用于查看投票信息"，显示目前结果 // 1.3.4 认证成功 ->
进入投票页面 // 2. 投票操作 // 2.1 进行选择，获取选择 // 2.2 对选项数据进行加密
// 2.3 异步发送到远程数据库，本地通过 store 或 缓存 进行修改 // 投票页面
<template>
  <div class="toVote" v-if="verified">
    <!-- 主体内容开始 -->

    <h1 class="topicname">{{ topic.tname }}</h1>
    <div class="topicinfo">
      发起人：
      <span class="sponsor">{{ topic.fromUserName }}</span>
      截止日期：
      <span class="deadline">{{ topic.tdeadline }}</span>
    </div>
    <div class="attention">
      <h3>注意事项</h3>
      <ul>
        <li>1. 每个认证码只能进行一次投票</li>
        <li>2. 投票截止后，认证码将失效</li>
        <li>3. 请为您的选择报以负责的态度</li>
        <li>4. 您的选择将会被加密处理，您可放心参与投票</li>
      </ul>
    </div>
    <el-divider></el-divider>
    <div class="topicdesc">
      <h3>投票主题描述：</h3>
      <p class="topicDetail" v-html="topic.tdetail"></p>
    </div>

    <h3>主题选项：</h3>
    <div class="form">
      <el-card class="box-card" v-for="(option, index) in options" :key="index">
        <!-- 选项头像 -->
        <el-avatar
          :size="96"
          v-if="option.opic != '' && option.opic != null"
          :src="option.opic"
        ></el-avatar>
        <el-avatar :size="96" v-else>
          {{ option.oname.substring(0, 1) }}
        </el-avatar>
        <!-- 选项名称 -->
        <h2>{{ option.oname }}</h2>
        <span class="desc">{{ option.odesc }}</span>
        <!-- <el-checkbox
          v-model="voterecords.selections[index]"
          :true-label="1"
          :false-label="0"
          :disabled="!effective || useout <= 0"
          border
        >
          我要选TA
        </el-checkbox> -->
        <br />
        <br />
        <el-input-number
          v-model="voterecords.selections[index]"
          @change="selctionChanged"
          class="selectionNum"
          aria-readonly="true"
          :min="0"
          :max="topic.tnum"
          :precision="0"
          label="选TA"
          :disabled="!effective || useout <= 0"
        ></el-input-number>
      </el-card>
    </div>
    <div class="submit">
      <el-button v-if="effective" type="primary" plain @click="reChoose">
        重置选票
      </el-button>
      <el-button
        type="primary"
        @click="confirmDialogVisible = true"
        v-if="effective"
      >
        点击提交
      </el-button>
      <el-button type="primary" @click="showResult" v-if="!effective">
        查看结果
      </el-button>
      <el-dialog
        title="提示"
        :visible.sync="confirmDialogVisible"
        width="30%"
        center
        top="19vh"
        :before-close="handleClose"
      >
        <p>提交后您所使用的认证码将失效，您将无法修改投票选项。</p>
        <p>是否确定提交您的选票？</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confirmDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="confirmSubmit"
            :disabled="!effective"
          >
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vote',
  data() {
    return {
      topic: {},
      options: [],
      voterecords: {
        tlid: '',
        selections: [],
      },
      useout: 0, // 用于判断是否还有票数
      confirmDialogVisible: false,
      verified: false, // 判断是否由认证码
      effective: false, // 判断认证码是否有效， 若有效则为 true，若无效，为 false
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    // 数字输入框内容变化时
    selctionChanged(currentValue, oldValue) {
      // 计算当前同之前增加还是减少
      var difference = currentValue - oldValue
      // 计算剩余票数 currentUseOut = useout + oldValue - currentValue
      if (this.useout - difference < 0) {
        // 非法票数
        this.$message({
          type: 'warning',
          message: '请勿非法投票，请在跳转后输入认证码重新进入',
        })
        // 关闭投票页
        this.closePage()
        this.$router.push("jump")
      } else {
        this.useout = this.useout - difference
      }
    },
    // 清楚当前选择数据，重新选择
    reChoose() {
      // 重置可选数量
      this.useout = this.topic.tnum
      // 重置已获投票
      this.voterecords.selections = new Array(this.options.length)
      document.getElementsByClassName('selectionNum')
      for (var i = 0; i < this.options.length; i++) {
        // 初始默认票数都是0
        this.voterecords.selections[i] = 0
      }
    },
    confirmSubmit() {     
      if (this.useout == this.topic.tnum) {
        this.$message({
          type: 'warning',
          message: '您当前还未投票',
        })
        // 关闭窗口
        this.confirmDialogVisible = false;
      } else {
        // 加密数据，并提交
        this.encodeSelections();
      }
    },
    checkEffective() {
      // 进行身份合法性核查
      var verified = this.$store.getters.getVerified
      var effective = this.$store.getters.getEffective

      console.log(verified)
      if (!verified) {
        this.$notify.error({
          title: '系统提示',
          message: '您的认证码错误，请核查后重新输入',
          type: 'error',
        })
        this.$router.push('/jump')
      } else if (!effective) {
        //有认证码，认证码失效
        this.$message({
          message: '您已参与过投票，当前仅能查看投票信息，无法再进行投票',
          type: 'warning',
        })
        this.verified = true
        // 填充数据
        var topicData = this.$route.params.topicData
        this.topic = topicData.topic
        this.options = topicData.options
      } else {
        // 认证码可以使用
        this.effective = true
        this.verified = true
        // 填充数据
        var topicData = this.$route.params.topicData
        this.topic = topicData.topic
        this.options = topicData.options
        this.useout = topicData.topic.tnum
        // 填充当前投票人id
        this.voterecords.tlid = topicData.participant.tlid
        // 初始化票数数组
        this.voterecords.selections = new Array(topicData.options.length)
        for (var i = 0; i < topicData.options.length; i++) {
          // 初始默认票数都是0
          this.voterecords.selections[i] = 0
        }

        this.$message({
          type: 'info',
          message:
            '您的总票数为' + this.topic.tnum + '票，请勿输入非法投票数据。',
        })
      }
    },
    // 重置认证数据并跳转
    closePage() {
      this.effective = false
      this.verified = false
      this.$store.commit('setVerifiedStatus', false)
      this.$store.commit('setEffectiveStatus', false)
    },
    // 查看投票结果
    showResult() {
      var that = this
      this.$router.push({
        name: 'Result',
        params: {
          tid: that.topic.tid,
        },
      })
    },
    // 加密选项数据
    encodeSelections(){
      var that = this;
      this.axios
      .post("https://api.beatree.cn/paillier/encode/array", {numbers: this.voterecords.selections})
      .then( response => {
        var res = response.data;
        if(res.status == 1){
          for(var i = 0; i < this.voterecords.selections.length; i++){
            this.voterecords.selections[i] = res.data[i];
          }
          console.log(res.data)
          // 提交数据
          this.submitVoterecords();
        }else{
          this.$message({
            message: res.message,
            type: 'success',
          })
          
        }
      })
    },
    // 提交密文投票数据
    submitVoterecords(){
        // 发送数据到服务器
        this.axios
          .post('vote/tovote', this.voterecords)
          .then(response => {
            var res = response.data
            if (res.status == 1) {
              // 提示客户端成功信息
              this.$message({
                message: '恭喜您，投票成功！',
                type: 'success',
              })
            } else {
              this.$message({
                message: res.message,
                type: 'warning',
              })
            }
          })
          .catch(error => {
            this.$message({
              message: error,
              type: 'error',
            })
          })
        // 隐藏弹框
        this.confirmDialogVisible = false
        this.effective = false
        // 显示票数
        // 修改store信息
        this.$store.commit('setVerifiedStatus', false)
        this.$store.commit('setEffectiveStatus', false)
    }

  },
  created() {
    console.log('Before check')
    this.checkEffective()
  },
  beforeDestroy() {
    this.closePage()
  },
}
</script>

<style lang="scss" scoped>
.toVote {
  width: 80%;
  margin: 0 auto;
  font-size: 18px;

  h1 {
    text-align: center;
  }
}

div.topicinfo {
  margin: 0 auto;
  text-align: center;

  span {
    margin-right: 12px;
  }
  span.deadline {
    color: red;
  }
}
div.topicdesc {
  //   border-top: 3px solid #22c3f0;
  border-top-left-radius: 2px;
  margin-top: 3px;
  padding-top: 3px;
  font-size: 16px;
  line-height: 22px;
}
.topicDetail {
  p {
    text-indent: 2em !important;
  }
}
p {
  text-indent: 2em;
}
div.attention {
  background-color: #f4f4f4;
  padding: 5px 0 12px 12px;
  margin-top: 12px;
  margin-bottom: 12px;
  border-radius: 5px;
}
div.form {
  // border: 1px solid red;
  width: 90%;
  margin: 0 auto;
}

// 投票选项布局
.box-card {
  height: 360px;
  border-width: 2px;
  text-align: center;
}
.box-card .el-avatar {
  margin-top: 18px;
  font-size: 36px;
}
.el-checkbox-button,
.el-checkbox {
  margin-top: 16px;
  display: block;
  width: 50%;
  margin-left: 25%;
}
// 提交按钮样式
div.submit {
  width: 90%;
  text-align: center;
  display: block;
  clear: both;
}
div .submit button {
  width: 160px;
  height: 45px;
  font-size: 16px;
  margin: 12px 0 0 12px;
}
</style>
