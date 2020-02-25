// 无授权码体验页面
<template>
  <div class="toVote">
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
          <el-button type="primary" @click="confirmDialogVisible = false">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Example',
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
    }
  },
  methods: {
    handleClose(done) {
      done();
    },
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
