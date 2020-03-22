<template>
  <el-container v-loading="loading" class="container">
    <ul v-if="messages.length > 0">
      <li v-for="(message, index) in messages" :key="message.nid">
        <el-tag>{{ message.fromUserName }}</el-tag>
        <div :class="message.haveRead ? 'rightPart read' : 'rightPart'">
          <div class="noticeTitle">
            {{ message.title }}
            <span @click="readMessage(index)">点击查看详情</span>
            
          </div>
          <span class="time">{{ message.time }}</span>
        </div>
        <div class="delButton" style="margin-left: auto;margin-right: 66px">
          <el-button
              @click="delMessage(index)"
              type="danger"
              icon="el-icon-delete"
              circle
              style=""
            ></el-button>
        </div>
      </li>
    </ul>
    <h3 v-else style="margin: 32px auto;">您当前还没有消息通知哦~</h3>

    <!-- 页码展示 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 12px;"
    ></el-pagination>

    <el-dialog title="消息详情" :visible.sync="dialogVisible">
      <MessageDialog :message="dialogmsg"></MessageDialog>
    </el-dialog>
  </el-container>
</template>

<script>
import MessageDialog from '../utils/MessageDialog.vue'

export default {
  name: 'Message',
  data() {
    return {
      loading: false, // 数据加载控制器
      currentPage: 1, // 分页显示器
      pagesize: 5,
      total: 0,
      readStatus: 'rightPart read', //消息是否已读
      dialogVisible: false, //
      dialogmsg: {},
      messages: [],
    }
  },
  methods: {
    // 初始化本地通知数据
    getMessages() {
      this.loading = true
      this.axios
        .get('notice/myNotices/' + this.currentPage + '/' + this.pagesize, {
          headers:{
            token: this.$store.getters.getUserInfo.token
          }
        })
        .then(response => {
          var res = response.data
          if (res.status == 1) {
            // 填充远程数据
            this.messages = res.data
            this.total = res.total
            this.currentPage = res.current
          }

          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    // 查看通知详情
    readMessage(index) {
      // console.log(index)
      var currentMessage = this.messages[index]
      //   修改弹窗绑定内容
      this.dialogmsg = currentMessage
      // 显示弹窗
      this.dialogVisible = true
      //   修改messages的状态
      this.messages[index].haveRead = 1
      //   异步修改服务器端数据
      this.axios
        .put('notice/readNotice/' + currentMessage.nid, {},{
          headers:{
            token: this.$store.getters.getUserInfo.token
          }
        })
        .then(response => {
          var res = response.data
          var infoType = 'warning'
          if (res.status == 1) {
            infoType = 'success' // 修改通知类型
          }
          this.$message({
            type: infoType,
            message: res.message,
          })
        })
    },
    // 删除当前通知
    delMessage(index) {
      var currentMessage = this.messages[index]
      //   异步修改服务器端数据
      this.axios
        .delete('notice/delNotice/' + currentMessage.nid, {
          headers:{
            token: this.$store.getters.getUserInfo.token
          }
        })
        .then(response => {
          var res = response.data
          var infoType = 'warning'
          if (res.status == 1) {
            infoType = 'success' // 修改通知类型
            this.messages.splice(index, 1) // 本地删除该条数据
          }
          this.$message({
            type: infoType,
            message: res.message,
          })
        })
    },
    handleSizeChange(val) {
      // 更新pagesize
      this.pagesize = val
      this.getMessages()
      console.log(`handleSizeChange: 每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // 更新当前页面
      this.currentPage = val
      this.getMessages()
      console.log(`handleCurrentChange: 当前页 ${val} `)
    },
  },
  components: {
    MessageDialog,
  },
  created() {
    // 初始化后台数据
    this.getMessages()
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 760px){
  ul {
    width: 98%;
    overflow: hidden;
    padding: 0;
  }
  div.delButton{
    margin-right: 0px !important;
  }
}
.container{
  display: flex;
  flex-direction: column;
}
ul {
  width: 100%;
  padding-left: 0px;
}
li {
  display: flex;
  height: 52px;
  width: 100%;
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
