<template>
  <div>
    <h1>管理投票页面</h1>
    <el-table
      :data="
        tableData.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase()),
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
      <el-table-column label="投票主题名称" prop="name" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="投票主题简介" width="500">
        <template slot-scope="scope">
          <div class="detailInTable">
            {{ scope.row.detail }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="截止日期" width="220">
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
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码展示 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      hide-on-single-page
      :current-page="currentPage4"
      :page-sizes="[50, 100, 200]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      style="margin-top: 12px;"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Manage',
  data() {
    return {
      tableData: [
        {
          id: 1,
          deadline: '2016-05-02',
          name: '李小虎李小虎李小虎李小虎李小虎李小虎李小虎李小虎李小虎',
          detail:
            '很多愿望，我想要的，上苍都给了我，很快或者很慢地，我都一一地接到了。而我对青春的美的渴望，虽然好象一直没有得到，可是走着走着，回过头一看，好象又都已经过去了。有几次，当时并没能马上感觉到，可是，也很有几次，我心里猛然醒悟：原来，这就是青春！ 很多愿望，我想要的，上苍都给了我，很快或者很慢地，我都一一地接到了。而我对青春的美的渴望，虽然好象一直没有得到，可是走着走着，回过头一看，好象又都已经过去了。有几次，当时并没能马上感觉到，可是，也很有几次，我心里猛然醒悟：原来，这就是青春！ ',
        },
        {
          id: 2,
          deadline: '2016-05-04',
          name: '王小虎',
          detail:
            '很多愿望，我想要的，上苍都给了我，很快或者很慢地，我都一一地接到了。而我对青春的美的渴望，虽然好象一直没有得到，可是走着走着，回过头一看，好象又都已经过去了。有几次，当时并没能马上感觉到，可是，也很有几次，我心里猛然醒悟：原来，这就是青春！ ',
        },
        {
          id: 3,
          deadline: '2016-05-01',
          name: '王小虎',
          detail:
            '很多愿望，我想要的，上苍都给了我，很快或者很慢地，我都一一地接到了。而我对青春的美的渴望，虽然好象一直没有得到，可是走着走着，回过头一看，好象又都已经过去了。有几次，当时并没能马上感觉到，可是，也很有几次，我心里猛然醒悟：原来，这就是青春！ ',
        },
        {
          id: 4,
          deadline: '2016-05-03',
          name: '王小虎',
          detail:
            '很多愿望，我想要的，上苍都给了我，很快或者很慢地，我都一一地接到了。而我对青春的美的渴望，虽然好象一直没有得到，可是走着走着，回过头一看，好象又都已经过去了。有几次，当时并没能马上感觉到，可是，也很有几次，我心里猛然醒悟：原来，这就是青春！ ',
        },
      ],
      search: '',
      loading: true,
      currentPage4: 4,
      // busy: false,
    }
  },
  methods: {
    // 获取用户个人创建的投票主题
    getMyTopics() {
      setTimeout(() => {
        this.loading = false
      }, 500)
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
      console.log(`handleSizeChange: 每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`handleCurrentChange: 当前页 ${val} `)
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
