// 投票页面 // 1. 拦截验证 // 1.1 需输入认证码 // 1.2 后台查询返回结果 // 1.3
进入或退出 // 1.3.1 认证码错误 -> 提示信息 "认证码错误，请勿恶意尝试"，退出页面
// 1.3.2 认证码正确，投票主题错误 -> 提示信息 "您的投票主题链接错误，请点击 ??
进行投票" 跳转投票 // 1.3.3 认证码正确，已投过票 -> 提示信息
"该认证码已失效，仅可用于查看投票信息"，显示目前结果 // 1.3.4 认证成功 ->
进入投票页面 // 2. 投票操作 // 2.1 进行选择，获取选择 // 2.2 对选项数据进行加密
// 2.3 异步发送到远程数据库，本地通过 store 或 缓存 进行修改 // 投票页面
<template>
  <div class="toVote" v-if="verified">
    
    <!-- 主体内容开始 -->

    <h1 class="topicname">最美程序猿评选</h1>
    <div class="topicinfo">
      发起人：
      <span class="sponsor">做棵大树</span>
      截止日期：
      <span class="deadline">2020-05-01</span>
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
      <p>
        很多愿望，我想要的，上苍都给了我，很快或者很慢地，我都一一地接到了。而我对青春的美的渴望，虽然好象一直没有得到，可是走着走着，回过头一看，好象又都已经过去了。有几次，当时并没能马上感觉到，可是，也很有几次，我心里猛然醒悟：原来，这就是青春！
      </p>
    </div>
    <div class="form">
      <el-card class="box-card" v-for="(option, index) in options" :key="index">
        <!-- 选项头像 -->
        <el-avatar
          :size="96"
          v-if="option.pic != '' && option.pic != null"
          :src="option.pic"
        ></el-avatar>
        <el-avatar :size="96" v-else>
          {{ option.name.substring(0, 1) }}
        </el-avatar>
        <!-- 选项名称 -->
        <h2>{{ option.name }}</h2>
        <span class="desc">{{ option.desc }}</span>
        <el-checkbox
          v-model="result[index]"
          :true-label="1"
          :false-label="0"
          :disabled="effective"
          border
        >
          我要选TA
        </el-checkbox>
      </el-card>
    </div>
    <div class="submit">
      <el-button type="primary" @click="confirmDialogVisible = true">
        点击提交
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
          <el-button type="primary" @click="confirmSubmit">
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
      options: [
        {
          id: 0,
          name: '张三',
          pic: require('@/assets/img/heads/0.jpg'),
          desc: 'adaadf',
          num: 0,
        },
        {
          id: 1,
          name: '李四',
          //   pic: require('@/assets/img/heads/0.jpg'),
          desc: 'adaadf',
          num: 0,
        },
        {
          id: 2,
          name: '王五',
          pic: require('@/assets/img/heads/1.jpg'),
          desc: 'adaadf',
          num: 0,
        },
        {
          id: 3,
          name: '赵六',
          pic: require('@/assets/img/heads/2.jpg'),
          desc: 'adaadf',
          num: 0,
        },
      ],
      result: [0, 0, 0, 0],
      confirmDialogVisible: false,
      verified: false, // 判断是否由认证码
      effective: false, // 判断认证码是否有效
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    confirmSubmit() {
      // 发送数据到服务器

      // 提示客户端成功信息
      this.$message({
        message: '您已提交选票',
        type: 'success',
      })

      // 显示票数
    },
    checkEffective() {
      // 进行身份合法性核查
      var verified = this.$store.getVerified
      var effective = this.$store.getEffective

      if (!verified) {
        // 如果未验证
        // this.$alert('您的认证码错误，请核查后重新输入', '系统提示', {
        //   confirmButtonText: '确定',
        //   showClose: false,
        //   callback: action => {
        //     this.$router.push('/jump')
        //   }
        // });
        this.$notify.error({
          title: "系统提示",
          message: '您的认证码错误，请核查后重新输入',
          type: 'error',
        })
        this.$router.push('/jump')
        
        console.log('before alert')
      } else if (!effective) {
        //有认证码，认证码失效
        this.$message({
          message: '您的认证码已失效，仅能查看投票信息，无法再进行投票',
          type: 'warning',
        })
        this.verified = true
      } else {
        // 认证码可以使用
        this.effective = true
        this.verified = true
      }
    },
  },
  created() {
    console.log('Before check')
    this.checkEffective()
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
  border: 1px solid red;
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
