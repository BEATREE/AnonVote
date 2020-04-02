<template>
  <div>
    <h1>通知管理</h1>
    <el-table
      :data="
        tableData.filter(
          data =>
            !search ||
            data.title.toLowerCase().includes(search.toLowerCase()) ||
            data.fromUserName.toLowerCase().includes(search.toLowerCase()) ||
            data.toUserName.toLowerCase().includes(search.toLowerCase()),
        )
      "
      class="scrollTable"
      ref="scrollTable"
      :default-sort="{ prop: 'tid', order: 'null' }"
      v-loading="loading"
    >
      <!-- 
      v-infinite-scroll="load"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10" -->
      <el-table-column
        label="id"
        prop="nid"
        width="80"
        sortable
      ></el-table-column>
      <el-table-column
        label="通知标题"
        prop="title"
        width="180"
        sortable
      ></el-table-column>

      <el-table-column label="发起方" prop="fromUserName" width="130" sortable>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.fromUserName }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="接收方" prop="fromUserName" width="130" sortable>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.toUserName }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="内容" width="410">
        <template slot-scope="scope">
          <div
            class="detailInTable"
            v-html="scope.row.content.substring(0, 100)"
          ></div>
        </template>
      </el-table-column>

      <el-table-column label="发送日期" width="220" prop="tdeadline" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-left: 10px"></i>
          <span style="margin-left: 5px">
            {{ scope.row.time | dateFormat }}
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
            预览
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
  name: 'AdminMessages',
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
    getAllNotices() {
      // 显示加载状态
      this.loading = true

      this.axios
        .get('notice/allNotices/' + this.currentPage + '/' + this.pagesize, {
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
    handleSizeChange(val) {
      // 更新pagesize
      this.pagesize = val
      this.getAllNotices()
      console.log(`handleSizeChange: 每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // 更新当前页面
      this.currentPage = val
      this.getAllNotices()
      console.log(`handleCurrentChange: 当前页 ${val} `)
    },
    handlePreview(index, row) {
      this.$alert(row.content, row.title, {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback: action => {},
      })
    },
    handleDelete(index, row) {
      console.log(index, ':', row)
      // index 为列表序号，row 为对象，可通过 row.tid 来获取投票id
      this.axios
        .delete('notice/delNotice/' + row.nid, {
          headers: {
            token: this.$store.getters.getAdminInfo.token,
          },
        })
        .then(response => {
          var res = response.data
          var infoType = 'error'
          if (res.status == 1) {
            // 操作成功
            this.getAllNotices()
            infoType = 'success'
          }
          this.$message({
            message: res.message,
            type: infoType,
          })
        })
    },
  },
  created() {
    this.getAllNotices()
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
