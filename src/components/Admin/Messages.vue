<template>
  <div>
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        <el-tag>{{ message.from }}</el-tag>
        <div :class="message.read?'rightPart read':'rightPart'">
          <div class="noticeTitle">
            {{ message.title }}
            <span @click="readMessage(index)">点击查看详情</span>
          </div>
          <span class="time">{{ message.time }}</span>
        </div>
      </li>
    </ul>

    <el-dialog title="消息详情" :visible.sync="dialogVisible">
      <MessageDialog :message="dialogmsg"></MessageDialog>
    </el-dialog>
  </div>
</template>

<script>
import MessageDialog from '../utils/MessageDialog.vue'

export default {
  name: 'Message',
  data() {
    return {
      readStatus: 'rightPart read', //消息是否已读
      dialogVisible: false, //
      dialogmsg: {},
      messages: [
        {
          id: 0,
          from: '系统通知',
          title: 'AnonVote页面布局调整',
          content:
            'AnonVote页面布局调整，将投票管理页面无限加载修改为分页查看。AnonVote页面布局调整，将投票管理页面无限加载修改为分页查看。AnonVote页面布局调整，将投票管理页面无限加载修改为分页查看。AnonVote页面布局调整，将投票管理页面无限加载修改为分页查看。AnonVote页面布局调整，将投票管理页面无限加载修改为分页查看。AnonVote页面布局调整，将投票管理页面无限加载修改为分页查看。AnonVote页面布局调整，将投票管理页面无限加载修改为分页查看。',
          time: '2020-03-01 13:20:23',
          read: 0,
        },
        {
          id: 1,
          from: '系统通知',
          title: 'AnonVote页面布局调整',
          content:
            'AnonVote页面布局调整，将投票管理页面无限加载修改为分页查看。',
          time: '2020-03-01 13:20:23',
          read: 0,
        },
        {
          id: 1,
          from: '系统通知',
          title: 'AnonVote页面布局调整',
          content:
            'AnonVote页面布局调整，将投票管理页面无限加载修改为分页查看。',
          time: '2020-03-01 13:20:23',
          read: 0,
        },
      ],
    }
  },
  methods: {
    //   查看通知详情
    readMessage(index) {
      console.log(index)
      //   修改弹窗绑定内容
      this.dialogmsg = this.messages[index]
      // 显示弹窗
      this.dialogVisible = true
      //   修改messages的状态
      this.messages[index].read = 1
      //   异步修改服务器端数据
      //   this.axios.push("", "").then((response)={})
    },
  },
  components: {
    MessageDialog,
  },
  created() {},
  mounted() {},
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  height: 52px;
  margin-bottom: 22px;
  border-bottom: 2px solid #f3f5f7;
  div.rightPart {
    margin-left: 20px;
    &.read {
      color: #93999f;
      a {
        color: #93999f;
      }
    }
    div.noticeTitle {
      margin-bottom: 10px;
      span {
        margin-left: 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
