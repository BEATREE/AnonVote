<template>
  <div>
    <h1>投票管理</h1>
    <el-table
      :data="
        tableData.filter(
          data =>
            !search || data.tname.toLowerCase().includes(search.toLowerCase()),
        )
      "
      class="scrollTable"
      ref="scrollTable"
      :default-sort = "{prop: 'tid', order: 'null'}"
      v-loading="loading"
    >
      <!-- 
      v-infinite-scroll="load"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10" -->
      <el-table-column label="id" prop="tid" width="80" sortable>
      </el-table-column>
      <el-table-column label="投票主题名称" prop="name" width="180" sortable>
        <el-tooltip
              class="item"
              effect="dark"
              content="点击名称可查看当前投票结果"
              placement="top"
            >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper"  @click="showResult(scope.row.tid)">
            {{ scope.row.tname }}
          </div>
        </template>
        </el-tooltip>
      </el-table-column>

      <el-table-column label="发起人" prop="tname" width="130" sortable>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.fromUserName }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="投票主题简介" width="410">
        <template slot-scope="scope">
          <div
            class="detailInTable"
            v-html="scope.row.tdetail.substring(0, 100)"
          ></div>
        </template>
      </el-table-column>

      <el-table-column label="截止日期" width="220" prop="tdeadline" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-left: 10px"></i>
          <span style="margin-left: 5px">
            {{ scope.row.tdeadline | dateFormat }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <!-- slot-scope="scope" -->
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="small"
            style="padding-left:8px;width:220px;"
            prefix-icon="el-icon-search"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handlePreview(scope.$index, scope.row)"
          >
            预览内容
          </el-button>
          
          <el-button
            size="mini"
            type="warning"
            style="margin-right: 6px;"
            @click="handleSendMessage(scope.$index, scope.row)"
          >
            发送通知
          </el-button>

          <el-popconfirm
            title="确定删除吗？(该操作不可撤回)"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button size="mini" type="danger" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码展示 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 30, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 12px;"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'AdminTopics',
  data() {
    return {
      tableData: [],
      search: '',
      loading: true,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      // busy: false,
    }
  },
  methods: {
    // 获取用户个人创建的投票主题
    getAllTopics() {
      // 显示加载状态
      this.loading = true

      this.axios
        .get('topic/allTopics/' + this.currentPage + '/' + this.pagesize, {
          headers: {
            token: this.$store.getters.getAdminInfo.token,
          },
        })
        .then(response => {
          var res = response.data
          if (res.status == 1) {
            // 填充远程数据
            this.tableData = res.data
            this.total = res.total
            this.currentPage = res.current
          } else {
            this.$message({
              type: 'warning',
              message: res.message,
            })
          }

          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },

    // 设置滚动表格容器的高度用来保证滚动效果
    setTableHight() {
      var pageHeight = document.body.clientHeight
      console.log(pageHeight)
      // console.log(this.$refs['scrollTable'])
      this.$refs['scrollTable'].$el.style.height = pageHeight - 183 + 'px'
    },
    // 处理页大小改变
    handleSizeChange(val) {
      // 更新pagesize
      this.pagesize = val
      this.getAllTopics()
      console.log(`handleSizeChange: 每页 ${val} 条`)
    },
    // 处理当前页码改变
    handleCurrentChange(val) {
      // 更新当前页面
      this.currentPage = val
      this.getAllTopics()
      console.log(`handleCurrentChange: 当前页 ${val} `)
    },
    // 预览投票内容
    handlePreview(index, row) {
      this.axios
        .get('topic/getTopic/' + row.tid, {
          headers: {
            token: this.$store.getters.getAdminInfo.token,
          },
        })
        .then(response => {
          var res = response.data
          if (res.status == 1) {
            // 获取成功
            // 显示内容
            this.$alert(res.data.tdetail, res.data.tname, {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              callback: action => {
                
              },
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.message,
            })
          }
        })
    },
    // 删除该条投票
    handleDelete(index, row) {
      console.log(index, ':', row)
      // index 为列表序号，row 为对象，可通过 row.tid 来获取投票id
      this.axios
        .delete('topic/delete/' + row.tid, {
          headers: {
            token: this.$store.getters.getAdminInfo.token,
          },
        })
        .then(response => {
          var res = response.data
          var infoType = 'error'
          if (res.status == 1) {
            // 操作成功
            this.tableData.splice(index, 1) // 列表中删除
            this.total -= 1
            this.pagesize -= 1
            infoType = 'success'
          }
          this.$message({
            message: res.message,
            type: infoType,
          })
        })
    },
    // 向发起人发送通知
    handleSendMessage(index, row){
      // 携带uid参数跳转到发布通知页面
      this.$router.push({
        name: "AddMessage",
        params:{
          uid: row.uid,
        }
      })
    },
    // 查看投票结果
    showResult(tid) {
      this.$router.push({
        name: 'Result',
        params: {
          tid: tid,
        },
      })
    },
  },
  created() {
    this.getAllTopics()
  },
  mounted() {
    // this.setTableHight()
  },
}
</script>

<style lang="scss" scoped>
// table滚动样式
.scrollTable {
  width: 100%;
  overflow: auto;
  // border: 1px solid red;
  // scrollbar-width: thin;
}

.detailInTable {
  margin-left: 8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
