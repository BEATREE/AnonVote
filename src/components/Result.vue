// 认证码核查页面

<template>
  <div class="jumpPanel">
    <h1><span style="color:#6783e8;">{{ result.topic.tname }}</span> | 活动投票结果</h1>

    <el-table :data="result.options" style="width: 100%">
      <el-table-column
        prop="oname"
        label="选项名称"
        :default-sort = "{prop: 'onum', order: 'descending'}"
      ></el-table-column>
      <el-table-column label="所获票数" prop="onum" sortable>
        <template slot-scope="scope">
          <!--计算当前选项所获选票百分比-->
          <el-progress
            :percentage="scope.row.onum / result.max * 100"
            :stroke-width="20"
            :text-inside="true"
            :color="customColorMethod"
          ></el-progress>
          票数：{{scope.row.onum}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Result',
  data() {
    return {
      topicId: '', // 投票主体id，用于跳转
      result: {
          topic:{},
          options:[]
      },
    }
  },
  methods: {
    //    设定进度条颜色
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399'
      } else if (percentage < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },
    initInfo() {
      this.topicId = this.$route.params.tid
      console.log(this.topicId)
      console.log(this.topicId == undefined)
      // typeof() 查看某种变量的类型，number、string、boolean、object、function、undefined
      if (this.topicId == undefined) {
        this.$message({
          type: 'warning',
          message: '非法访问，即将跳回主页',
        })
        this.$router.push('index')
      } else {
        this.getResult()
      }
    },
    getResult() {
      this.axios
        .get('vote/showVoteResult/' + this.topicId)
        .then(response => {
          var res = response.data
          if (res.status == 1) {
            this.result = res.data
            // 将字符串转为数字
            for(var i = 0; i < this.result.options.length; i++){
                this.result.options[i].onum = parseInt(this.result.options[i].onum)
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.message,
            })
          }
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: error,
          })
        })
    },
  },
  created() {
    this.initInfo()
  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 970px) {
  div.jumpPanel {
    width: 80% !important;
  }
}
div.jumpPanel {
  display: flex;
  flex-direction: column;
  width: 38%;
  margin: 0 auto;
  h1{
      text-align: center;
      margin-bottom: 28px;
  }
}
.checkbutton {
  margin-top: 15px;
  float: right;
}
</style>
