<template>
  <div>
    <h1>用户管理</h1>
    <el-table
      :data="
        tableData.filter(
          data =>
            !search 
            || data.uname.toLowerCase().includes(search.toLowerCase())
            || data.uemail.toLowerCase().includes(search.toLowerCase()),
        )
      "
      class="scrollTable"
      ref="scrollTable"
      v-loading="loading"
    >
      <!-- 
      v-infinite-scroll="load"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10" -->
      <el-table-column label="id" prop="uid" width="80" sortable>
      </el-table-column>

       <el-table-column label="用户名称" prop="uname" width="180" sortable>
      </el-table-column>

      <el-table-column label="用户邮箱" prop="uemail" width="200">
      </el-table-column>

      <el-table-column label="当前状态" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success" v-if="scope.row.ustatus==1">正常</el-tag>
            <el-tag size="medium" type="warning" v-else-if="scope.row.ustatus==0">冻结</el-tag>
            <el-tag size="medium" type="danger" v-else>已删除</el-tag>
          </div>
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
          <el-button size="mini" @click="handleToNormal(scope.$index, scope.row)" type="success">
            恢复正常
          </el-button>
          <el-button size="mini" @click="handleFreeze(scope.$index, scope.row)" type="warning">
            冻结账户
          </el-button>

          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
            style="margin-left: 6px;"
          >
            <el-button size="mini" type="danger" slot="reference">
              删除账户
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
      :page-sizes="[10, 30, 50, -1]"
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
    getAllUsers() {
      // 显示加载状态
      this.loading = true
      
      this.axios
        .get('user/allUsers/' + this.currentPage + '/' + this.pagesize, {
          headers:{
            token: this.$store.getters.getAdminInfo.token
          }
        })
        .then(response => {
          var res = response.data
          if (res.status == 1) {
            // 填充远程数据
            this.tableData = res.data
            this.total = res.total
            this.currentPage = res.current
          }else{
            this.$message({
              type: 'warning',
              message: res.message
            })
          }

          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
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
      this.getAllUsers()
      console.log(`handleSizeChange: 每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // 更新当前页面
      this.currentPage = val
      this.getAllUsers()
      console.log(`handleCurrentChange: 当前页 ${val} `)
    },
    handleEdit(index, row) {
      this.axios.get("topic/getTopic/" + row.tid, {
        headers:{
          token: this.$store.getters.getAdminInfo.token
        }
      }).then( response => {
        var res = response.data;
        if(res.status == 1){
          // 获取成功
          // 页面带参跳转
          this.$router.push({
            name: 'Reedit',
            params:{
              topicData: res.data
            }
          })
        }else{
          this.$message({
            type: "warning",
            message: res.message
          })
        }
      })
      
    },
    handleToNormal(index, row){
       // index 为列表序号，row 为对象，可通过 row.tid 来获取投票id
      this.axios.put('user/updateUserStatus/' + row.uid +"/1",{}, {
          headers:{
            token: this.$store.getters.getAdminInfo.token
          }
        }).then(response => {
        var res = response.data
        var infoType = 'error'
        if (res.status == 1) {
          this.getAllUsers();
          infoType = 'success';
        }
        this.$message({
          message: res.message,
          type: infoType,
        })
      })
    },
    handleFreeze(index, row){
       // index 为列表序号，row 为对象，可通过 row.tid 来获取投票id
      this.axios.put('user/updateUserStatus/' + row.uid +"/0",{}, {
          headers:{
            token: this.$store.getters.getAdminInfo.token
          }
        }).then(response => {
        var res = response.data
        var infoType = 'error'
        if (res.status == 1) {
          this.getAllUsers();
          infoType = 'success';
        }
        this.$message({
          message: res.message,
          type: infoType,
        })
      })
    },
    handleDelete(index, row) {
      // index 为列表序号，row 为对象，可通过 row.tid 来获取投票id
      this.axios.put('user/updateUserStatus/' + row.uid +"/2",{}, {
          headers:{
            token: this.$store.getters.getAdminInfo.token
          }
        }).then(response => {
        var res = response.data
        var infoType = 'error'
        if (res.status == 1) {
          this.getAllUsers();
          infoType = 'success';
        }
        this.$message({
          message: res.message,
          type: infoType,
        })
      })
    },
  },
  created() {
    this.getAllUsers()
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
