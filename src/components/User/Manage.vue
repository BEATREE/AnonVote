<template>
  <div>
    <h1>管理投票</h1>
    <el-table
      :data="
        tableData.filter(
          data =>
            !search || data.tname.toLowerCase().includes(search.toLowerCase()),
        )
      "
      class="scrollTable"
      ref="scrollTable"
      :default-sort = "{prop: 'tdeadline', order: 'descending'}"
      v-loading="loading"
    >
      <!-- 
      v-infinite-scroll="load"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10" -->
      <el-table-column label="投票主题名称" prop="tname" width="180" sortable>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
              v-if="
                new Date(scope.row.tdeadline).getTime() > new Date().getTime()
              "
            >
              {{ scope.row.tname }}
            </el-tag>
            <el-tag size="medium" type="danger" v-else>
              {{ scope.row.tname }}·已结束
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="投票主题简介" width="500" prop="detail">
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
          <span style="margin-left: 10px">
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
          <el-button size="mini" @click="handlePreview(scope.$index, scope.row)" type="success">
            查看
          </el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-popconfirm
            title="确定删除吗？(该操作不可撤回)"
            @onConfirm="handleDelete(scope.$index, scope.row)"
            style="margin-left:5px;"
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
      :page-sizes="[10, 15, 20, -1]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 12px;"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Manage',
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
    getMyTopics() {
      // 显示加载状态
      this.loading = true

      this.axios
        .get('topic/myTopics/' + this.currentPage + '/' + this.pagesize, {
          headers: {
            token: this.$store.getters.getUserInfo.token,
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
    // 懒加载
    // load() {
    //   this.busy = true
    //   setTimeout(() => {
    //     this.tableData.push({
    //       id: 4,
    //       deadline: '2016-05-03',
    //       name: '王小虎',
    //       detail:
    //         '很多愿望，我想要的，上苍都给了我，很快或者很慢地，我都一一地接到了。而我对青春的美的渴望，虽然好象一直没有得到，可是走着走着，回过头一看，好象又都已经过去了。有几次，当时并没能马上感觉到，可是，也很有几次，我心里猛然醒悟：原来，这就是青春！ ',
    //     })
    //     this.busy = false
    //   }, 200)
    // },
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
      this.getMyTopics()
      console.log(`handleSizeChange: 每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // 更新当前页面
      this.currentPage = val
      this.getMyTopics()
      console.log(`handleCurrentChange: 当前页 ${val} `)
    },
    handlePreview(index, row) {
      this.axios
        .get('topic/getTopic/' + row.tid, {
          headers: {
            token: this.$store.getters.getUserInfo.token,
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
    handleEdit(index, row) {
      this.axios
        .get('topic/getTopic/' + row.tid, {
          headers: {
            token: this.$store.getters.getUserInfo.token,
          },
        })
        .then(response => {
          var res = response.data
          if (res.status == 1) {
            // 获取成功
            // 页面带参跳转
            this.$router.push({
              name: 'Reedit',
              params: {
                topicData: res.data,
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
    handleDelete(index, row) {
      console.log(index, ':', row)
      // index 为列表序号，row 为对象，可通过 row.tid 来获取投票id
      this.axios
        .delete('topic/delete/' + row.tid, {
          headers: {
            token: this.$store.getters.getUserInfo.token,
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
  },
  created() {
    this.getMyTopics()
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
